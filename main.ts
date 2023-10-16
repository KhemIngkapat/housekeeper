function pick_up(target: number) {
    huskylens.request()
    if (huskylens.isAppear(target, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        iBIT.Servo(ibitServo.SV2, 60)
        iBIT.Motor(ibitMotor.Forward, 50)
        basic.pause(200)
        iBIT.MotorStop()
        iBIT.Servo(ibitServo.SV2, 0)
    }
    
}

function locate_target(target: number) {
    huskylens.request()
    let result = huskylens.isAppear(target, HUSKYLENSResultType_t.HUSKYLENSResultBlock)
    while (!result) {
        iBIT.Turn(ibitTurn.Left, 50)
        basic.pause(500)
        iBIT.MotorStop()
        basic.pause(2000)
        huskylens.request()
        result = huskylens.isAppear(target, HUSKYLENSResultType_t.HUSKYLENSResultBlock)
    }
    result = false
}

function center_target(target: number) {
    huskylens.request()
    let x_center = huskylens.readeBox(target, Content1.xCenter)
    let pause_time = Math.abs(x_center - 150) * 8
    while (!(x_center >= 130 && x_center <= 170)) {
        basic.showNumber(x_center)
        if (x_center < 130) {
            iBIT.Turn(ibitTurn.Right, 25)
            basic.pause(pause_time)
            iBIT.MotorStop()
            basic.pause(500)
        } else if (x_center > 170) {
            iBIT.Turn(ibitTurn.Left, 25)
            basic.pause(pause_time)
            iBIT.MotorStop()
            basic.pause(500)
        }
        
        huskylens.request()
        x_center = huskylens.readeBox(target, Content1.xCenter)
        pause_time = Math.abs(x_center - 150) * 8
    }
    x_center = -1
}

function go_to_target(target: number, target_width: number) {
    huskylens.request()
    let width = huskylens.readeBox(target, Content1.width)
    while (width < target_width || width - target_width > 3) {
        iBIT.Motor(ibitMotor.Forward, 25)
        basic.pause((50 - width) * 50)
        iBIT.MotorStop()
        basic.pause(500)
        huskylens.request()
        width = huskylens.readeBox(target, Content1.width)
    }
    width = 0
}

huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
iBIT.Servo(ibitServo.SV1, 0)
iBIT.Servo(ibitServo.SV2, 0)
basic.forever(function on_forever() {
    pick_up(1)
    basic.pause(2000)
})
