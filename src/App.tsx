import { use, useEffect, useState } from "react"
import { Board } from "./components/Board"
import { Machine } from "./interfaces/Machines"
import { ChoiceArea } from "./components/ChoiceArea"
import { Design } from "./interfaces/Designs"


function App() {
  const [machinesOnBoard, setMachinesOnBoard] = useState<(Machine | null)[]>(Array(36).fill(null))
  const [pickableDesign, setPickableDesign] = useState<Design | null>(null)
  const [pickableMachines, setPickableMachines] = useState<(Machine|null)[]>([null, null])
  const [tentativelyPlacedMachines, setTentativelyPlacedMachines] = useState<([number,Machine | null] | null)[]>([null, null])
  const [currentMachine, setCurrentMachine] = useState<number>(-1)
  const [designs, setDesigns] = useState<Design[]>([])
  const [score, setScore] = useState<number>(0)
  const [turnsLeft, setTurnsLeft] = useState<number>(40)
  const [started, setStarted] = useState<boolean>(false)
  const [confirmed, setConfirmed] = useState<boolean>(false)

  useEffect(() => {
    if (started) {
      // Generate a random design and machines for the player to choose from
      if(turnsLeft > 0) {
            console.log("turn proceeded");
        proceedTurn()
      } else {
        alert(`Game Over! Your final score is ${score}`)
        setStarted(false)
        setScore(0)
        setTurnsLeft(40)
        setDesigns([])
        setMachinesOnBoard(Array(36).fill(null))
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
    const designKeys = Object.keys(Design) as (keyof typeof Design)[]
    const machineKeys = Object.keys(Machine) as (keyof typeof Machine)[]
    setPickableDesign(Design[designKeys[Math.floor(Math.random() * designKeys.length)]])
    setPickableMachines([
      Machine[machineKeys[Math.floor(Math.random() * machineKeys.length)]],
      Machine[machineKeys[Math.floor(Math.random() * machineKeys.length)]]
    ])
  }


  const setMachineAtIndexTentatively = (index: number, machine: Machine) => {
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

      newMachines[index] = machine
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
    // Placeholder scoring logic - to be replaced with actual scoring based on designs and machine placements
    const newScore = score + Math.floor(Math.random() * 10) + 1
    setScore(newScore)
  }

  const addDesign = (design: Design) => {
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
        <>
          <Board  
            machines={machinesOnBoard} 
            currentMachine={pickableMachines[currentMachine]} 
            setMachineAtIndexTentatively={setMachineAtIndexTentatively}
            tentativelyPlacedMachines={tentativelyPlacedMachines}
          />
           
          <ChoiceArea 
            pickableDesign={pickableDesign} 
            tentativelyPlacedMachines={tentativelyPlacedMachines}  
            pickableMachines={pickableMachines} 
            addDesign={addDesign} 
            setCurrentMachine={setCurrentMachine}/>
        </>
      :
        <button onClick={() => setStarted(true)}>Start Game</button>
      }
    </>
  )
}

export default App

