def look(cur_pos: number, pos: number):
    if cur_pos < pos:
        step = 1
    else:
        step = -1
    for i in range(cur_pos, pos, step):
        iBIT.servo(ibitServo.SV1, i)
        basic.pause(50)
def locate_target(target: number):
    global result, is_round2, is_left, completed
    basic.show_number(1)
    iBIT.spin(ibitSpin.RIGHT, 40)
    basic.pause(500)
    iBIT.motor_stop()
    basic.pause(500)
    huskylens.request()
    result = False
    is_round2 = 0
    is_left = 1
    completed = 1
    while not (result):
        if completed >= 288:
            basic.show_icon(IconNames.NO)
            basic.pause(1000)
            completed = 0
            break
        if is_round2 == 12:
            iBIT.motor(ibitMotor.FORWARD, 50)
            basic.pause(750)
            iBIT.motor_stop()
            is_round2 = 0
            is_left = randint(0, 1)
        if is_left == 1:
            iBIT.spin(ibitSpin.LEFT, 70)
            basic.pause(80)
            iBIT.motor_stop()
        else:
            iBIT.spin(ibitSpin.RIGHT, 70)
            basic.pause(80)
            iBIT.motor_stop()
        huskylens.request()
        result = huskylens.is_appear(target, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK)
        is_round2 += 1
        completed += 1
    result = False
    is_round2 = 0
    return completed
def go_to_target(target2: number, target_width: number, servo_pos: number):
    global width, y_center, serv_pos
    huskylens.request()
    width = huskylens.readeBox_index(target2, 1, Content1.WIDTH)
    y_center = huskylens.readeBox_index(target2, 1, Content1.Y_CENTER)
    serv_pos = servo_pos
    if width > 300:
        iBIT.motor(ibitMotor.BACKWARD, 50)
        basic.pause(200)
        iBIT.motor_stop()
    while width < target_width:
        basic.show_icon(IconNames.HAPPY)
        if abs(width - target_width) <= target_width * 0.1:
            break
        y_center = huskylens.readeBox_index(target2, 1, Content1.Y_CENTER)
        if y_center >= 120 and y_center <= 160:
            pass
        else:
            new_servo_pos = serv_pos + (y_center - 140) * 0.16
            if y_center < 0:
                new_servo_pos = servo_pos
            print(new_servo_pos)
            look(serv_pos, new_servo_pos)
        serv_pos = new_servo_pos
        width = huskylens.readeBox_index(target2, 1, Content1.WIDTH)
        basic.pause(500)
        iBIT.motor(ibitMotor.FORWARD, 30)
        basic.pause((target_width - width) * 20)
        iBIT.motor_stop()
        width = huskylens.readeBox_index(target2, 1, Content1.WIDTH)
        huskylens.request()
    width = -1
    y_center = -1
def release():
    iBIT.servo(ibitServo.SV2, 60)
    iBIT.motor(ibitMotor.BACKWARD, 50)
    basic.pause(2000)
    iBIT.servo(ibitServo.SV2, 0)
    iBIT.motor_stop()
def center_target(target3: number):
    global x_center, pause_time, is_round
    huskylens.request()
    x_center = huskylens.readeBox_index(target3, 1, Content1.X_CENTER)
    pause_time = abs(x_center - 150) * 4
    is_round = 0
    while not (x_center >= 130 and x_center <= 170):
        if is_round >= 96 and not (x_center):
            iBIT.motor(ibitMotor.BACKWARD, 50)
            basic.pause(500)
            iBIT.motor_stop()
            is_round = 0
        if x_center < 130 and x_center > 0:
            iBIT.spin(ibitSpin.RIGHT, 25)
            basic.pause(pause_time)
            iBIT.motor_stop()
        elif x_center > 170:
            iBIT.spin(ibitSpin.LEFT, 25)
            basic.pause(pause_time)
            iBIT.motor_stop()
        elif x_center < 0:
            if is_left == 1:
                iBIT.spin(ibitSpin.RIGHT, 25)
            else:
                iBIT.spin(ibitSpin.LEFT, 25)
            basic.pause(100)
            iBIT.motor_stop()
        huskylens.request()
        x_center = huskylens.readeBox_index(target3, 1, Content1.X_CENTER)
        pause_time = abs(x_center - 150) * 4
        is_round += 1
    x_center = -1
def pick_up(target4: number):
    huskylens.request()
    if huskylens.is_appear(target4, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        iBIT.servo(ibitServo.SV2, 60)
        iBIT.motor(ibitMotor.FORWARD, 30)
        basic.pause(2500)
        iBIT.motor_stop()
        iBIT.servo(ibitServo.SV2, 0)
    iBIT.motor(ibitMotor.BACKWARD, 25)
    basic.pause(1500)
    iBIT.motor_stop()
index = 0
is_round = 0
pause_time = 0
x_center = 0
serv_pos = 0
y_center = 0
width = 0
completed = 0
is_left = 0
is_round2 = 0
result = False
servo_pos28 = 0
servo_pos26 = 0
servo_pos24 = 0
pause_time22 = 0
x_center22 = 0
servo_pos22 = 0
y_center22 = 0
width22 = 0
result22 = False
new_servo_pos2 = 0
result2 = False
width2 = 0
y_center2 = 0
servo_pos23 = 0
x_center2 = 0
pause_time2 = 0
servo_pos25 = 0
servo_pos27 = 0
servo_pos29 = 0
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
iBIT.servo(ibitServo.SV1, 0)
iBIT.servo(ibitServo.SV2, 0)

def on_forever():
    global index
    look(0, 47)
    while index < 7:
        huskylens.init_i2c()
        huskylens.init_mode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        cmp = locate_target(1)
        if cmp:
            basic.show_icon(IconNames.HEART)
            center_target(1)
            basic.show_icon(IconNames.SMALL_HEART)
            go_to_target(1, 15, 30)
            basic.show_icon(IconNames.TSHIRT)
            pick_up(1)
            basic.pause(1000)
            look(0, 47)
        else:
            index += 0 - 1
        if index == 1 or index == 3 or index == 5 or index == 6:
            basic.show_icon(IconNames.HOUSE)
            look(47, 10)
            huskylens.init_i2c()
            huskylens.init_mode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
            locate_target(1)
            basic.show_icon(IconNames.HEART)
            center_target(1)
            basic.show_icon(IconNames.SMALL_HEART)
            go_to_target(1, 150, 10)
            basic.show_icon(IconNames.TSHIRT)
            release()
            basic.pause(1000)
        index += 1
    look(0, 47)
    index = 0
    basic.show_icon(IconNames.EIGHTH_NOTE)
    while index < 7:
        huskylens.init_i2c()
        huskylens.init_mode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        cmp = locate_target(2)
        if cmp:
            basic.show_icon(IconNames.HEART)
            center_target(2)
            basic.show_icon(IconNames.SMALL_HEART)
            go_to_target(2, 25, 30)
            basic.show_icon(IconNames.TSHIRT)
            pick_up(2)
            basic.pause(1000)
            look(0, 47)
        else:
            index += 0 - 1
        if index == 1 or index == 3 or index == 5 or index == 6:
            basic.show_icon(IconNames.HOUSE)
            look(47, 10)
            huskylens.init_i2c()
            huskylens.init_mode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
            locate_target(2)
            basic.show_icon(IconNames.HEART)
            center_target(2)
            basic.show_icon(IconNames.SMALL_HEART)
            go_to_target(2, 150, 10)
            basic.show_icon(IconNames.TSHIRT)
            release()
            basic.pause(1000)
        index += 1
basic.forever(on_forever)
