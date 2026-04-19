import { useEffect, useState } from "react"
import { Board } from "./components/Board"
import { MACHINE } from "./interfaces/Machines"
import { ChoiceArea } from "./components/ChoiceArea"
import { DESIGN } from "./interfaces/Designs"
import { DesignsArea } from "./components/DesignsArea"
import { Info } from "./components/Info"
import { Machine } from "./machines/Machine"
import { MachineFactory } from "./machines/MachineFactory"


function App() {
  const [machinesOnBoard, setMachinesOnBoard] = useState<(Machine | null)[]>(Array(64).fill(null))
  const [pickableDesign, setPickableDesign] = useState<DESIGN | null>(null)
  const [pickableMachines, setPickableMachines] = useState<(MACHINE|null)[]>([null, null])
  const [tentativelyPlacedMachines, setTentativelyPlacedMachines] = useState<([number,Machine | null] | null)[]>([null, null])
  const [currentMachine, setCurrentMachine] = useState<number>(-1)
  const [designs, setDesigns] = useState<DESIGN[]>([])
  const [score, setScore] = useState<number>(0)
  const [turnsLeft, setTurnsLeft] = useState<number>(20)
  const [started, setStarted] = useState<boolean>(false)
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isBoardHovered, setIsBoardHovered] = useState(false)

  useEffect(() => {
    if (started) {
      // Generate a random design and machines for the player to choose from
      if(turnsLeft > 0) {
        proceedTurn()
      } else {
        alert(`Game Over! Your final score is ${score}`)
        setStarted(false)
        setScore(0)
        setTurnsLeft(20)
        setDesigns([])
        setMachinesOnBoard(Array(64).fill(null))
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


  function generatePicks() {
    const designKeys = Object.keys(DESIGN) as (keyof typeof DESIGN)[]
    const machineKeys = Object.keys(MACHINE) as (keyof typeof MACHINE)[]
    setPickableDesign(DESIGN[designKeys[Math.floor(Math.random() * designKeys.length)]])
    setPickableMachines([
      MACHINE[machineKeys[Math.floor(Math.random() * machineKeys.length)]],
      MACHINE[machineKeys[Math.floor(Math.random() * machineKeys.length)]]
    ])
  }


  const setMachineAtIndexTentatively = (index: number, machine: MACHINE) => {
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
    setScore(newScore);
  }

  const addDesign = (design: DESIGN) => {
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
  }


  
  return (
    <>
      {
      started ? 
      <div className="grid grid-cols-[55%_45%] gap-4" onMouseMove={(event) => setMousePos({ x: event.clientX, y: event.clientY })}>
        <div className="grid grid-rows-2 gap-4">
          <DesignsArea designs={designs}/>
          <div className="flex flex-col items-center">
            <ChoiceArea 
              pickableDesign={pickableDesign} 
              tentativelyPlacedMachines={tentativelyPlacedMachines}  
              pickableMachines={pickableMachines} 
              addDesign={addDesign} 
              setCurrentMachine={setCurrentMachine}
              currentMachine={currentMachine}
              />              
          </div>

        </div>
        <div className="grid grid-rows-[80%_20%] items-center">
          <Board  
            machines={machinesOnBoard} 
            currentMachine={pickableMachines[currentMachine]} 
            setMachineAtIndexTentatively={setMachineAtIndexTentatively}
            tentativelyPlacedMachines={tentativelyPlacedMachines}
            onBoardHoverChange={setIsBoardHovered}
          />
          <Info score={score} turnsLeft={turnsLeft} />          
        </div>

        {currentMachine >= 0 && pickableMachines[currentMachine] && !isBoardHovered && (
          <div
            className="fixed z-50 pointer-events-none rounded-full bg-black/10 p-1 text-4xl opacity-80"
            style={{ left: mousePos.x - 24, top: mousePos.y - 24 }}
          >
            {pickableMachines[currentMachine]}
          </div>
        )}
      </div>
      
      :
        <button onClick={() => setStarted(true)}>Start Game</button>
      }
    </>
  )
}

export default App

