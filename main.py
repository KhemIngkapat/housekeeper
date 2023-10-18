def look(cur_pos: number, pos: number):
    if cur_pos < pos:
        step = 1
    else:
        step = -1
    for i in range(cur_pos, pos, step):
        iBIT.servo(ibitServo.SV1, i)
        basic.pause(50)
def locate_target(target: number):
    basic.show_number(1)
    huskylens.request()
    result = huskylens.is_appear(target, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK)
    while not (result):
        iBIT.turn(ibitTurn.LEFT, 50)
        basic.pause(500)
        iBIT.motor_stop()
        basic.pause(2000)
        huskylens.request()
        result = huskylens.is_appear(target, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK)
    result = False
def go_to_target(target2: number, target_width: number, servo_pos: number):
    huskylens.request()
    width = huskylens.reade_box(target2, Content1.WIDTH)
    y_center = huskylens.reade_box(target2, Content1.Y_CENTER)
    while width < target_width or width - target_width > 3:
        y_center = huskylens.reade_box(1, Content1.Y_CENTER)
        if y_center >= 120 and y_center <= 160:
            pass
        else:
            new_servo_pos = servo_pos + (y_center - 140) * 0.2
            print(new_servo_pos)
            look(servo_pos, new_servo_pos)
        servo_pos = new_servo_pos
        basic.pause(500)
        iBIT.motor(ibitMotor.FORWARD, 25)
        basic.pause((50 - width) * 30)
        iBIT.motor_stop()
        basic.pause(500)
        width = huskylens.reade_box(target2, Content1.WIDTH)
        huskylens.request()
    width = -1
    y_center = -1
def release():
    iBIT.servo(ibitServo.SV2, 60)
    iBIT.motor(ibitMotor.BACKWARD, 50)
    basic.pause(300)
    iBIT.servo(ibitServo.SV2, 0)
    iBIT.motor_stop()
def center_target(target3: number):
    huskylens.request()
    x_center = huskylens.reade_box(target3, Content1.X_CENTER)
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
        x_center = huskylens.reade_box(target3, Content1.X_CENTER)
        pause_time = abs(x_center - 150) * 8
    x_center = -1
def pick_up(target4: number):
    huskylens.request()
    if huskylens.is_appear(target4, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        iBIT.servo(ibitServo.SV2, 60)
        iBIT.motor(ibitMotor.FORWARD, 25)
        basic.pause(1300)
        iBIT.motor_stop()
        iBIT.servo(ibitServo.SV2, 0)
pause_time = 0
x_center = 0
servo_pos2 = 0
y_center = 0
width = 0
result = False
new_servo_pos2 = 0
result2 = False
width2 = 0
y_center2 = 0
servo_pos22 = 0
x_center2 = 0
pause_time2 = 0
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
iBIT.servo(ibitServo.SV1, 20)
iBIT.servo(ibitServo.SV2, 0)

def on_forever():
    huskylens.init_i2c()
    huskylens.init_mode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
    look(0, 30)
    for index in range(2):
        locate_target(1)
        basic.show_icon(IconNames.HEART)
        center_target(1)
        basic.show_icon(IconNames.SMALL_HEART)
        go_to_target(1, 30, 30)
        basic.show_icon(IconNames.TSHIRT)
        pick_up(1)
        basic.pause(5000)
    huskylens.init_i2c()
    huskylens.init_mode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
    look(30, 0)
    locate_target(1)
    basic.show_icon(IconNames.HEART)
    center_target(1)
    basic.show_icon(IconNames.SMALL_HEART)
    go_to_target(1, 50, 30)
    basic.show_icon(IconNames.TSHIRT)
    release()
    basic.pause(5000)
basic.forever(on_forever)
