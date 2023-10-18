function look (cur_pos: number, pos: number) {
    let step: number;
if (cur_pos < pos) {
        step = 1
    } else {
        step = -1
    }
    for (let i of _py.range(cur_pos, pos, step)) {
        iBIT.Servo(ibitServo.SV1, i)
        basic.pause(50)
    }
}
function locate_target (target: number) {
    basic.showNumber(1)
    iBIT.Turn(ibitTurn.Right, 50)
    basic.pause(500)
    iBIT.MotorStop()
    basic.pause(500)
    huskylens.request()
    result = false
    is_round = 0
    while (!(result)) {
        if (is_round == 10) {
            iBIT.Motor(ibitMotor.Forward, 50)
            basic.pause(1000)
            iBIT.MotorStop()
            is_round = 0
        }
        iBIT.Turn(ibitTurn.Left, 50)
        basic.pause(500)
        iBIT.MotorStop()
        basic.pause(2000)
        huskylens.request()
        result = huskylens.isAppear(target, HUSKYLENSResultType_t.HUSKYLENSResultBlock)
        is_round += 1
    }
    result = false
    is_round = 0
}
function go_to_target (target2: number, target_width: number, servo_pos: number) {
    let new_servo_pos: number;
huskylens.request()
    width = huskylens.readeBox(target2, Content1.width)
    y_center = huskylens.readeBox(target2, Content1.yCenter)
    while (width < target_width) {
        basic.showIcon(IconNames.Happy)
        y_center = huskylens.readeBox(1, Content1.yCenter)
        if (y_center >= 120 && y_center <= 160 && (y_center < 120 || y_center > 160)) {
        	
        } else {
            new_servo_pos = servo_pos + (y_center - 140) * 0.2
            console.log(new_servo_pos)
look(servo_pos, new_servo_pos)
        }
        servo_pos = new_servo_pos
        basic.pause(500)
        iBIT.Motor(ibitMotor.Forward, 25)
        basic.pause((50 - width) * 25)
        iBIT.MotorStop()
        basic.pause(500)
        width = huskylens.readeBox(target2, Content1.width)
        huskylens.request()
    }
    width = -1
    y_center = -1
}
function release () {
    iBIT.Servo(ibitServo.SV2, 60)
    iBIT.Motor(ibitMotor.Backward, 50)
    basic.pause(2000)
    iBIT.Servo(ibitServo.SV2, 0)
    iBIT.MotorStop()
}
function center_target (target3: number) {
    huskylens.request()
    x_center = huskylens.readeBox(target3, Content1.xCenter)
    pause_time = Math.abs(x_center - 150) * 8
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
        x_center = huskylens.readeBox(target3, Content1.xCenter)
        pause_time = Math.abs(x_center - 150) * 8
    }
    x_center = -1
}
function pick_up (target4: number) {
    huskylens.request()
    if (huskylens.isAppear(target4, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        iBIT.Servo(ibitServo.SV2, 60)
        iBIT.Motor(ibitMotor.Forward, 25)
        basic.pause(2000)
        iBIT.MotorStop()
        iBIT.Servo(ibitServo.SV2, 0)
    }
}
let pause_time = 0
let x_center = 0
let servo_pos = 0
let y_center = 0
let width = 0
let is_round = 0
let result = false
let pause_time22 = 0
let x_center22 = 0
let servo_pos22 = 0
let y_center22 = 0
let width22 = 0
let result22 = false
let new_servo_pos2 = 0
let result2 = false
let width2 = 0
let y_center2 = 0
let servo_pos2 = 0
let x_center2 = 0
let pause_time2 = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
iBIT.Servo(ibitServo.SV1, 20)
iBIT.Servo(ibitServo.SV2, 0)
basic.forever(function () {
    huskylens.initI2c()
    huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
    look(0, 30)
    for (let index = 0; index < 2; index++) {
        locate_target(1)
        basic.showIcon(IconNames.Heart)
        center_target(1)
        basic.showIcon(IconNames.SmallHeart)
        go_to_target(1, 50, 30)
        basic.showIcon(IconNames.TShirt)
        pick_up(1)
        basic.pause(5000)
    }
    huskylens.initI2c()
    huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
    look(30, 10)
    locate_target(1)
    basic.showIcon(IconNames.Heart)
    center_target(1)
    basic.showIcon(IconNames.SmallHeart)
    go_to_target(1, 70, 30)
    basic.showIcon(IconNames.TShirt)
    release()
    basic.pause(5000)
})
