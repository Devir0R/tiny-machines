import { useEffect, useRef, useState } from "react"
import { Board } from "./components/Board"
import { MACHINE } from "./interfaces/Machines"
import { ChoiceArea } from "./components/ChoiceArea"
import { DesignsArea } from "./components/DesignsArea"
import { Info } from "./components/Info"
import { StartingScene } from "./components/StartingScene"
import { EndGameScene } from "./components/EndGameScene"
import { Machine } from "./machines/Machine"
import { MachineFactory } from "./machines/MachineFactory"
import { Design } from "./designs/Design"
import { DesignTypes } from "./data/DesignTypes"
import lowScoreSound from './assets/low-points.mp3'
import goodScoreSound from './assets/middle-points.mp3'
import highScoreSound from './assets/high-points.mp3'
import EpicScoreSound from './assets/highest-points.mp3'
import { useSound } from "react-sounds"

function App() {
  const [machinesOnBoard, setMachinesOnBoard] = useState<(Machine | null)[]>(Array(64).fill(null))
  const [pickableDesign, setPickableDesign] = useState<Design | null>(null)
  const [pickableMachines, setPickableMachines] = useState<(MACHINE|null)[]>([null, null])
  const [tentativelyPlacedMachines, setTentativelyPlacedMachines] = useState<([number,Machine | null] | null)[]>([null, null])
  const [currentMachine, setCurrentMachine] = useState<number>(-1)
  const [designs, setDesigns] = useState<Design[]>([])
  const [score, setScore] = useState<number>(0)
  const [turnsLeft, setTurnsLeft] = useState<number>(20)
  const [started, setStarted] = useState<boolean>(false)
  const [gameEnded, setGameEnded] = useState<boolean>(false)
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isBoardHovered, setIsBoardHovered] = useState(false)
  const [placingFromDesign, setPlacingFromDesign] = useState<{ designIndex: number, machineIcon: string } | null>(null)
  const [previousScore, setPreviousScore] = useState<number>(0)
  const [floatingText, setFloatingText] = useState<{id: number, amount: number}>()
  const infoRef = useRef<HTMLDivElement>(null);

  const {play : playLowScore} = useSound(lowScoreSound);
  const {play : playGoodScore} = useSound(goodScoreSound);
  const {play : playHighScore} = useSound(highScoreSound);
  const {play : playEpicScore} = useSound(EpicScoreSound);

    let colorClass =[
      "text-[#00FF15]",
      "text-[#09F814]",
      "text-[#12F214]",
      "text-[#1AEB13]",
      "text-[#23E512]",
      "text-[#2CDE11]",
      "text-[#35D711]",
      "text-[#3ED110]",
      "text-[#46CA0F]",
      "text-[#4FC40E]",
      "text-[#58BD0E]",
      "text-[#61B70D]",
      "text-[#6AB00C]",
      "text-[#72A90C]",
      "text-[#7BA30B]",
      "text-[#849C0A]",
      "text-[#8D9609]",
      "text-[#958F09]",
      "text-[#9E8808]",
      "text-[#A78207]",
      "text-[#B07B07]",
      "text-[#B97506]",
      "text-[#C16E05]",
      "text-[#CA6804]",
      "text-[#D36104]",
      "text-[#DC5A03]",
      "text-[#E55402]",
      "text-[#ED4D01]",
      "text-[#F64701]",
      "text-[#FF4000]"
  ];

  useEffect(() => {
    if (started) {
      // Generate a random design and machines for the player to choose from
      if(turnsLeft > 0) {
        proceedTurn()
      } else {
        setGameEnded(true)
      }
    }
  }, [started,turnsLeft])

  useEffect(() => {
    console.log("confirmed");
    
    if(confirmed) {
      setTurnsLeft(turnsLeft - 1)
      setConfirmed(false)
    }
  }, [confirmed])

  useEffect(() => {
    const added = score - previousScore;
    if(added !== 0){
      const newText = { id: Date.now(), amount: added };
      setFloatingText(newText);
      setTimeout(() => setFloatingText(undefined), 2000);
      playScoreSound(added)
      setPreviousScore(score);
    }
  }, [score, previousScore])

  const playScoreSound = (addedAmount:number)=>{
    if (addedAmount <= 10) {
      playLowScore()
    } else if (addedAmount <= 30) {
      playGoodScore()
    } else if (addedAmount <= 60) {
      playHighScore()
    } else {
      playEpicScore()
    }
  }
  
  const clamp = (num:number, min:number, max:number) => Math.min(Math.max(num, min), max)

  const getTextClasses = (amount: number) => {
    let sizeClass = '';

    if (amount <= 10) {
      sizeClass = 'text-sm';
    } else if (amount <= 30) {
      sizeClass = 'text-lg';
    } else if (amount <= 60) {
      sizeClass = 'text-xl';
    } else {
      sizeClass = 'text-3xl';
    }
    

    return `${sizeClass} ${colorClass[clamp(Math.floor(amount /4),0,29)]} font-bold`;
  };

  useEffect(() => {
    const handleContextMenu = (event: { preventDefault: () => void; clientX: any; clientY: any }) => {
      // Prevents the default browser context menu from appearing
      event.preventDefault(); 
      
      if(currentMachine !== -1 || placingFromDesign!== null) {
        setCurrentMachine(-1);
        setPlacingFromDesign(null);
      }
    };

    // Attach listener to the window to catch right-clicks anywhere
    window.addEventListener('contextmenu', handleContextMenu);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  
  function generatePicks() {
    const designOptions = Object.values(DesignTypes)
    const machineKeys = Object.keys(MACHINE) as (keyof typeof MACHINE)[]
    setPickableDesign(designOptions[Math.floor(Math.random() * designOptions.length)])
    setPickableMachines([
      MACHINE[machineKeys[Math.floor(Math.random() * machineKeys.length)]],
      MACHINE[machineKeys[Math.floor(Math.random() * machineKeys.length)]]
    ])
  }


  const setMachineAtIndexTentatively = (index: number, machine: MACHINE) => {
    if (placingFromDesign) {
      // Placing from design: place the machine and remove the design
      const newMachines = [...machinesOnBoard];
      newMachines[index] = MachineFactory.create(placingFromDesign.machineIcon as MACHINE, index);
      setMachinesOnBoard(newMachines);
      // Remove the design
      const newDesigns = designs.filter((_, i) => i !== placingFromDesign.designIndex);
      setDesigns(newDesigns);
      setPlacingFromDesign(null);
      setCurrentMachine(-1);
      return;
    }

    if (currentMachine >= 0) {

      const newMachines = [...machinesOnBoard]
      const newTentativelyPlacedMachines = [...tentativelyPlacedMachines]

      const alreadyTentativelyPlacedIndex = tentativelyPlacedMachines.findIndex(placed => placed && placed[0] === index)
      if(alreadyTentativelyPlacedIndex !== -1) {
        const [oldIndex, oldMachine] = tentativelyPlacedMachines[alreadyTentativelyPlacedIndex]!
        newMachines[oldIndex] = oldMachine
        newTentativelyPlacedMachines[alreadyTentativelyPlacedIndex] = null
      }

      if(tentativelyPlacedMachines[currentMachine] ) {
        const [oldIndex, oldMachine] = tentativelyPlacedMachines[currentMachine]!
        newMachines[oldIndex] = oldMachine
      }
      
      newTentativelyPlacedMachines[currentMachine] = [index, machinesOnBoard[index]]

      newMachines[index] =  MachineFactory.create(machine, index)
      setMachinesOnBoard(newMachines)

      setCurrentMachine(-1)
      
      if(newTentativelyPlacedMachines.every(placed => placed)) {
          setConfirmed(true)
          setTentativelyPlacedMachines([null, null])
      }
      else{
        setTentativelyPlacedMachines(newTentativelyPlacedMachines)
      }
    }
  }

  function proceedTurn() {
    calculateScore()
    // Reset for next turn
    setTentativelyPlacedMachines([null, null])
    generatePicks()
  }

  function calculateScore() {

    // Reset all effects from previous turn
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.resetEffects();
      }
    }

    for(const design of designs){
      design.applyEffect(machinesOnBoard);
    }
    // Apply effects (e.g., UFO marks adjacent machines for doubling)
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.applyEffects(machinesOnBoard);
      }
    }

    // Calculate scores with effects applied
    let newScore = 0;
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        newScore += machinesOnBoard[i]!.score(machinesOnBoard);
      }
    }

        
    for(const design of designs){
      newScore += design.score(machinesOnBoard);
    }

    setScore(newScore);
  }

  function calculateMachineContribution(index: number): number {
    if (!machinesOnBoard[index]) return 0;

    // Calculate score without this machine
    const machinesWithoutThis = machinesOnBoard.map((m, i) => i === index ? null : m);
    
    // Reset effects
    for (let i = 0; i < machinesWithoutThis.length; i++) {
      if (machinesWithoutThis[i]) {
        machinesWithoutThis[i]!.resetEffects();
      }
    }
    
    for(const design of designs){
      design.applyEffect(machinesWithoutThis);
    }
    
    for (let i = 0; i < machinesWithoutThis.length; i++) {
      if (machinesWithoutThis[i]) {
        machinesWithoutThis[i]!.applyEffects(machinesWithoutThis);
      }
    }
    
    let scoreWithout = 0;
    for (let i = 0; i < machinesWithoutThis.length; i++) {
      if (machinesWithoutThis[i]) {
        scoreWithout += machinesWithoutThis[i]!.score(machinesWithoutThis);
      }
    }
    
    for(const design of designs){
      scoreWithout += design.score(machinesWithoutThis);
    }

    // Calculate score with this machine
    let scoreWith = 0;
    
    // Reset effects on original board
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.resetEffects();
      }
    }
    
    for(const design of designs){
      design.applyEffect(machinesOnBoard);
    }
    
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.applyEffects(machinesOnBoard);
      }
    }
    
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        scoreWith += machinesOnBoard[i]!.score(machinesOnBoard);
      }
    }
    
    for(const design of designs){
      scoreWith += design.score(machinesOnBoard);
    }

    return Math.max(0, scoreWith - scoreWithout);
  }

  function calculatePotentialScore(index: number, machineType: MACHINE): number {
    // Create a temporary board with the machine placed at the index
    const tempMachines = [...machinesOnBoard];
    tempMachines[index] = MachineFactory.create(machineType, index);
    
    // Reset effects
    for (let i = 0; i < tempMachines.length; i++) {
      if (tempMachines[i]) {
        tempMachines[i]!.resetEffects();
      }
    }
    
    for(const design of designs){
      design.applyEffect(tempMachines);
    }
    
    for (let i = 0; i < tempMachines.length; i++) {
      if (tempMachines[i]) {
        tempMachines[i]!.applyEffects(tempMachines);
      }
    }
    
    let scoreWith = 0;
    for (let i = 0; i < tempMachines.length; i++) {
      if (tempMachines[i]) {
        scoreWith += tempMachines[i]!.score(tempMachines);
      }
    }
    
    for(const design of designs){
      scoreWith += design.score(tempMachines);
    }

    // Calculate score without the machine
    let scoreWithout = 0;
    
    // Reset effects on original board
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.resetEffects();
      }
    }
    
    for(const design of designs){
      design.applyEffect(machinesOnBoard);
    }
    
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.applyEffects(machinesOnBoard);
      }
    }
    
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        scoreWithout += machinesOnBoard[i]!.score(machinesOnBoard);
      }
    }
    
    for(const design of designs){
      scoreWithout += design.score(machinesOnBoard);
    }

    return Math.max(0, scoreWith - scoreWithout);
  }

  function calculateDesignPotentialScore(design: Design): number {
    // Calculate score with this design added
    const tempDesigns = [...designs, design];
    
    // Reset effects
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.resetEffects();
      }
    }
    
    for(const d of tempDesigns){
      d.applyEffect(machinesOnBoard);
    }
    
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.applyEffects(machinesOnBoard);
      }
    }
    
    let scoreWith = 0;
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        scoreWith += machinesOnBoard[i]!.score(machinesOnBoard);
      }
    }
    
    for(const d of tempDesigns){
      scoreWith += d.score(machinesOnBoard);
    }

    // Calculate score without this design
    let scoreWithout = 0;
    
    // Reset effects on original board
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.resetEffects();
      }
    }
    
    for(const d of designs){
      d.applyEffect(machinesOnBoard);
    }
    
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        machinesOnBoard[i]!.applyEffects(machinesOnBoard);
      }
    }
    
    for (let i = 0; i < machinesOnBoard.length; i++) {
      if (machinesOnBoard[i]) {
        scoreWithout += machinesOnBoard[i]!.score(machinesOnBoard);
      }
    }
    
    for(const d of designs){
      scoreWithout += d.score(machinesOnBoard);
    }

    return Math.max(0, scoreWith - scoreWithout);
  }

  const addDesign = (design: Design) => {
    if(designs.length >= 5) return false;
    setDesigns([...designs, design])
    for (let i = 0; i < tentativelyPlacedMachines.length; i++) {
      const placed = tentativelyPlacedMachines[i]
      if (placed) {
        const [index, oldMachine] = placed
        const newMachines = [...machinesOnBoard]
        newMachines[index] = oldMachine
        setMachinesOnBoard(newMachines)
      }
    }
    setTentativelyPlacedMachines([null, null])
    setConfirmed(true)
    return true;
  }

  const onMachineClick = (designIndex: number, machineIcon: string) => {
    setPlacingFromDesign({ designIndex, machineIcon });
    setCurrentMachine(-1); // Use 0 for design placement
  };

  
  const infoRect = infoRef.current?.getBoundingClientRect() ?? undefined;
  return (
    <>
      {
      started ? 
      <div className="grid grid-cols-[57%_40%] gap-4" onMouseMove={(event) => setMousePos({ x: event.clientX, y: event.clientY })}>
        <div className="grid grid-rows-[50%_45%] gap-4">
          <DesignsArea designs={designs} onMachineClick={onMachineClick} calculateDesignPotentialScore={calculateDesignPotentialScore}/>
          <div className="flex flex-col items-center">
            {gameEnded ? (
              <EndGameScene 
                score={score}
                onPlayAgain={() => {
                  setGameEnded(false)
                  setStarted(true)
                  setScore(0)
                  setTurnsLeft(20)
                  setDesigns([])
                  setMachinesOnBoard(Array(64).fill(null))
                  setPickableMachines([null, null])
                  setCurrentMachine(-1)
                  setTentativelyPlacedMachines([null, null])
                  setPlacingFromDesign(null)
                  generatePicks()
                }}
              />
            ) : (
              <ChoiceArea 
                pickableDesign={pickableDesign} 
                tentativelyPlacedMachines={tentativelyPlacedMachines}  
                pickableMachines={pickableMachines} 
                addDesign={addDesign} 
                setCurrentMachine={(index:number)=>{
                  setPlacingFromDesign(null);
                  setCurrentMachine(index);
                }}
                currentMachine={currentMachine}
                designPotentialScore={pickableDesign ? calculateDesignPotentialScore(pickableDesign) : undefined}
              />
            )}              
          </div>

        </div>
        <div className="grid grid-rows-[80%_20%] items-center">
          <Board  
            machines={machinesOnBoard} 
            currentMachine={pickableMachines[currentMachine]} 
            setMachineAtIndexTentatively={setMachineAtIndexTentatively}
            tentativelyPlacedMachines={tentativelyPlacedMachines}
            onBoardHoverChange={setIsBoardHovered}
            placingFromDesign={placingFromDesign}
            calculateMachineContribution={calculateMachineContribution}
            calculatePotentialScore={calculatePotentialScore}
          />
          <div ref={infoRef}>
            <Info score={score} turnsLeft={turnsLeft}  />
          </div>
        </div>

        {currentMachine >= 0 && pickableMachines[currentMachine] && !isBoardHovered && (
          <div
            className="fixed z-50 pointer-events-none rounded-full bg-black/10 p-1 text-4xl opacity-80"
            style={{ left: mousePos.x - 24, top: mousePos.y - 24 }}
          >
            {pickableMachines[currentMachine]}
          </div>
        )}

        {placingFromDesign && !isBoardHovered && (
          <div
            className="fixed z-50 pointer-events-none rounded-full bg-black/10 p-1 text-4xl opacity-80"
            style={{ left: mousePos.x - 24, top: mousePos.y - 24 }}
          >
            {placingFromDesign.machineIcon}
          </div>
        )}

          {infoRef && floatingText &&
          <div
            key={floatingText.id}
            className={`text-[5vh] fixed z-50 pointer-events-none score-float ${getTextClasses(floatingText.amount)}`}
            style={infoRect ?{
              left:infoRect.x + infoRect.width/2 , 
              top: infoRect.top
            } : {}}
          >
            +{floatingText.amount}
          </div>}
      </div>
      
      :
        <StartingScene onStartGame={() => {
          setStarted(true)
          generatePicks()
        }} />
      }
    </>
  )
}

export default App

