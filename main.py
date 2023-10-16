def pick_up(target):
    huskylens.request()
    if huskylens.is_appear(target, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        iBIT.servo(ibitServo.SV2, 60)
        iBIT.motor(ibitMotor.FORWARD, 50)
        basic.pause(200)
        iBIT.motor_stop()
        iBIT.servo(ibitServo.SV2, 0)


def locate_target(target):
    huskylens.request()
    result = huskylens.is_appear(target, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK)
    while not result:
        iBIT.turn(ibitTurn.LEFT, 50)
        basic.pause(500)
        iBIT.motor_stop()
        basic.pause(2000)
        huskylens.request()
        result = huskylens.is_appear(
            target, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK
        )
    result = False


def center_target(target):
    huskylens.request()
    x_center = huskylens.reade_box(target, Content1.X_CENTER)
    pause_time = abs(x_center - 150) * 8
    while not (x_center >= 130 and x_center <= 170):
        basic.show_number(x_center)
        if x_center < 130:
            iBIT.turn(ibitTurn.RIGHT, 25)
            basic.pause(pause_time)
            iBIT.motor_stop()
            basic.pause(500)
        elif x_center > 170:
            iBIT.turn(ibitTurn.LEFT, 25)
            basic.pause(pause_time)
            iBIT.motor_stop()
            basic.pause(500)
        huskylens.request()
        x_center = huskylens.reade_box(target, Content1.X_CENTER)
        pause_time = abs(x_center - 150) * 8
    x_center = -1


def go_to_target(target,target_width):
    huskylens.request()
    width = huskylens.reade_box(target, Content1.WIDTH)
    while width < target_width or width - target_width > 3:
        iBIT.motor(ibitMotor.FORWARD, 25)
        basic.pause((50 - width) * 50)
        iBIT.motor_stop()
        basic.pause(500)
        huskylens.request()
        width = huskylens.reade_box(target, Content1.WIDTH)
    width = 0

huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
iBIT.servo(ibitServo.SV1, 0)
iBIT.servo(ibitServo.SV2, 0)

def on_forever():
    pick_up(1)
    basic.pause(2000)
basic.forever(on_forever)
