// Move M&M colours through memory to keep track of M&M colours on the chain conveyor. Start at chainPos9 to avoid overwriting colours.
function shift () {
    chainPos9 = chainPos8
    chainPos8 = chainPos7
    chainPos7 = chainPos6
    chainPos6 = chainPos5
    chainPos5 = chainPos4
    chainPos4 = chainPos3
    chainPos3 = chainPos2
    chainPos2 = chainPos1
}
function push9 () {
    // Push yellow M&M off
    M_and_M.servoWrite(M_and_M.Servos.Servo6, 0)
    basic.pause(1000)
    // Pull pusher back
    M_and_M.servoWrite(M_and_M.Servos.Servo6, 180)
    basic.pause(1000)
}
function push3 () {
    // Push brown M&M off
    M_and_M.servoWrite(M_and_M.Servos.Servo3, 0)
    basic.pause(1000)
    // Pull pusher back
    M_and_M.servoWrite(M_and_M.Servos.Servo3, 180)
    basic.pause(1000)
}
function chainAdvance () {
    // Move back to next chain link position.
    M_and_M.servoWrite(M_and_M.Servos.Servo2, 0)
    basic.pause(1200)
    // Push conveyor forward one position and hold.
    M_and_M.servoWrite(M_and_M.Servos.Servo2, 180)
    basic.pause(1000)
}
function push5 () {
    // Push blue M&M off
    M_and_M.servoWrite(M_and_M.Servos.Servo4, 0)
    basic.pause(1000)
    // pull pusher back
    M_and_M.servoWrite(M_and_M.Servos.Servo4, 180)
    basic.pause(1000)
}
// Get M&M colour and store in ChainPos1 memory
function getColour () {
    chainPos1 = M_and_M.m_mColour()
}
function push7 () {
    // Push red M&M off
    M_and_M.servoWrite(M_and_M.Servos.Servo5, 0)
    basic.pause(1000)
    // pull pusher back
    M_and_M.servoWrite(M_and_M.Servos.Servo5, 180)
    basic.pause(1000)
}
function placeOne () {
    // Move placer under M&M tube and get
    // one M&M
    M_and_M.servoWrite(M_and_M.Servos.Servo1, 180)
    basic.pause(1000)
    // Push M&M forward and place on chain.
    // 
    M_and_M.servoWrite(M_and_M.Servos.Servo1, 0)
    basic.pause(1000)
}
function getReady () {
    pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
    // Placer is here
    // 0 = no M&M
    chainPos1 = 0
    chainPos2 = 0
    // Pusher 3 is here
    chainPos3 = 0
    chainPos4 = 0
    // Pusher 5 is here
    chainPos5 = 0
    chainPos6 = 0
    // Pusher 7 is here
    chainPos7 = 0
    chainPos8 = 0
    // Pusher 9 is here
    chainPos9 = 0
    // Put all 6 servo motors in home position (angle)
    M_and_M.servoWrite(M_and_M.Servos.Servo1, 180)
    M_and_M.servoWrite(M_and_M.Servos.Servo2, 0)
    M_and_M.servoWrite(M_and_M.Servos.Servo3, 180)
    M_and_M.servoWrite(M_and_M.Servos.Servo4, 180)
    M_and_M.servoWrite(M_and_M.Servos.Servo5, 180)
    M_and_M.servoWrite(M_and_M.Servos.Servo6, 180)
}
let chainPos1 = 0
let chainPos2 = 0
let chainPos3 = 0
let chainPos4 = 0
let chainPos5 = 0
let chainPos6 = 0
let chainPos7 = 0
let chainPos8 = 0
let chainPos9 = 0
getReady()
basic.forever(function () {
    // Run or stop?
    if (pins.digitalReadPin(DigitalPin.P5) == 1) {
        // Move chain forward
        chainAdvance()
        // Move colour forward in memory
        shift()
        // Put M&M on chain
        placeOne()
        // Get M&M colour and put into memory
        getColour()
        // Brown (1) M&M at chainPos3?
        if (chainPos3 == 1) {
            push3()
        }
        // Blue (6) M&M at chainPos5?
        if (chainPos5 == 6) {
            push5()
        }
        // Red (2) M&M at chainPos7?
        if (chainPos7 == 2) {
            push7()
        }
        // Yellow (4) M&M at chainPos9?
        if (chainPos9 == 4) {
            push9()
        }
    }
})
