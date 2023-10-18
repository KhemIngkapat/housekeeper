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
    iBIT.Spin(ibitSpin.Right, 40)
    basic.pause(500)
    iBIT.MotorStop()
    basic.pause(500)
    huskylens.request()
    result = false
    is_round2 = 0
    is_left = 1
    completed = 1
    while (!(result)) {
        if (completed >= 288) {
            basic.showIcon(IconNames.No)
            basic.pause(1000)
            completed = 0
            break;
        }
        if (is_round2 == 12) {
            iBIT.Motor(ibitMotor.Forward, 50)
            basic.pause(750)
            iBIT.MotorStop()
            is_round2 = 0
            is_left = randint(0, 1)
        }
        if (is_left == 1) {
            iBIT.Spin(ibitSpin.Left, 70)
            basic.pause(80)
            iBIT.MotorStop()
        } else {
            iBIT.Spin(ibitSpin.Right, 70)
            basic.pause(80)
            iBIT.MotorStop()
        }
        huskylens.request()
        result = huskylens.isAppear(target, HUSKYLENSResultType_t.HUSKYLENSResultBlock)
        is_round2 += 1
        completed += 1
    }
    result = false
    is_round2 = 0
    return completed
}
function go_to_target (target2: number, target_width: number, servo_pos: number) {
    let new_servo_pos: number;
huskylens.request()
    width = huskylens.readeBox_index(target2, 1, Content1.width)
    y_center = huskylens.readeBox_index(target2, 1, Content1.yCenter)
    serv_pos = servo_pos
    if (width > 300) {
        iBIT.Motor(ibitMotor.Backward, 50)
        basic.pause(200)
        iBIT.MotorStop()
    }
    while (width < target_width) {
        basic.showIcon(IconNames.Happy)
        if (Math.abs(width - target_width) <= target_width * 0.1) {
            break;
        }
        y_center = huskylens.readeBox_index(target2, 1, Content1.yCenter)
        if (y_center >= 120 && y_center <= 160) {
        	
        } else {
            new_servo_pos = serv_pos + (y_center - 140) * 0.16
            if (y_center < 0) {
                new_servo_pos = servo_pos
            }
            console.log(new_servo_pos)
look(serv_pos, new_servo_pos)
        }
        serv_pos = new_servo_pos
        width = huskylens.readeBox_index(target2, 1, Content1.width)
        basic.pause(500)
        iBIT.Motor(ibitMotor.Forward, 30)
        basic.pause((target_width - width) * 20)
        iBIT.MotorStop()
        width = huskylens.readeBox_index(target2, 1, Content1.width)
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
    x_center = huskylens.readeBox_index(target3, 1, Content1.xCenter)
    pause_time = Math.abs(x_center - 150) * 4
    is_round = 0
    while (!(x_center >= 130 && x_center <= 170)) {
        if (is_round >= 96 && !(x_center)) {
            iBIT.Motor(ibitMotor.Backward, 50)
            basic.pause(500)
            iBIT.MotorStop()
            is_round = 0
        }
        if (x_center < 130 && x_center > 0) {
            iBIT.Spin(ibitSpin.Right, 25)
            basic.pause(pause_time)
            iBIT.MotorStop()
        } else if (x_center > 170) {
            iBIT.Spin(ibitSpin.Left, 25)
            basic.pause(pause_time)
            iBIT.MotorStop()
        } else if (x_center < 0) {
            if (is_left == 1) {
                iBIT.Spin(ibitSpin.Right, 25)
            } else {
                iBIT.Spin(ibitSpin.Left, 25)
            }
            basic.pause(100)
            iBIT.MotorStop()
        }
        huskylens.request()
        x_center = huskylens.readeBox_index(target3, 1, Content1.xCenter)
        pause_time = Math.abs(x_center - 150) * 4
        is_round += 1
    }
    x_center = -1
}
function pick_up (target4: number) {
    huskylens.request()
    if (huskylens.isAppear(target4, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        iBIT.Servo(ibitServo.SV2, 60)
        iBIT.Motor(ibitMotor.Forward, 30)
        basic.pause(2500)
        iBIT.MotorStop()
        iBIT.Servo(ibitServo.SV2, 0)
    }
    iBIT.Motor(ibitMotor.Backward, 25)
    basic.pause(1500)
    iBIT.MotorStop()
}
let index = 0
let is_round = 0
let pause_time = 0
let x_center = 0
let serv_pos = 0
let y_center = 0
let width = 0
let completed = 0
let is_left = 0
let is_round2 = 0
let result = false
let servo_pos29 = 0
let servo_pos27 = 0
let servo_pos25 = 0
let pause_time2 = 0
let x_center2 = 0
let servo_pos23 = 0
let y_center2 = 0
let width2 = 0
let result2 = false
let new_servo_pos2 = 0
let result22 = false
let width22 = 0
let y_center22 = 0
let servo_pos22 = 0
let x_center22 = 0
let pause_time22 = 0
let servo_pos24 = 0
let servo_pos26 = 0
let servo_pos28 = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
iBIT.Servo(ibitServo.SV1, 0)
iBIT.Servo(ibitServo.SV2, 0)
basic.forever(function () {
    let cmp: number;
look(0, 47)
    while (index < 7) {
        huskylens.initI2c()
        huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        cmp = locate_target(1)
        if (cmp) {
            basic.showIcon(IconNames.Heart)
            center_target(1)
            basic.showIcon(IconNames.SmallHeart)
            go_to_target(1, 15, 30)
            basic.showIcon(IconNames.TShirt)
            pick_up(1)
            basic.pause(1000)
            look(0, 47)
        } else {
            index += 0 - 1
        }
        if (index == 1 || index == 3 || index == 5 || index == 6) {
            basic.showIcon(IconNames.House)
            look(47, 10)
            huskylens.initI2c()
            huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
            locate_target(1)
            basic.showIcon(IconNames.Heart)
            center_target(1)
            basic.showIcon(IconNames.SmallHeart)
            go_to_target(1, 150, 10)
            basic.showIcon(IconNames.TShirt)
            release()
            basic.pause(1000)
        }
        index += 1
    }
    look(0, 47)
    index = 0
    basic.showIcon(IconNames.EighthNote)
    while (index < 7) {
        huskylens.initI2c()
        huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        cmp = locate_target(2)
        if (cmp) {
            basic.showIcon(IconNames.Heart)
            center_target(2)
            basic.showIcon(IconNames.SmallHeart)
            go_to_target(2, 25, 30)
            basic.showIcon(IconNames.TShirt)
            pick_up(2)
            basic.pause(1000)
            look(0, 47)
        } else {
            index += 0 - 1
        }
        if (index == 1 || index == 3 || index == 5 || index == 6) {
            basic.showIcon(IconNames.House)
            look(47, 10)
            huskylens.initI2c()
            huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
            locate_target(2)
            basic.showIcon(IconNames.Heart)
            center_target(2)
            basic.showIcon(IconNames.SmallHeart)
            go_to_target(2, 150, 10)
            basic.showIcon(IconNames.TShirt)
            release()
            basic.pause(1000)
        }
        index += 1
    }
})
