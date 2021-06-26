# 목표 1
# 특성고려하지 않고 목표 각인이 주어졌을 때 가능한 각인 조합 알아내는 프로그램
from copy import copy
from operator import itemgetter

accs = []

def ImprintCombination(step: int, presentImprint: dict, purchased: list):
    # 33, 34, 35 셋중하나를 각인으로 고른다
    impset = []

    if step == 5:
        flag = 1
        for (imp1, activity) in presentImprint.items():
            if activity < 15:
                flag = 0
                break
        
        if flag == 1:
            purchased = sorted(purchased, key=itemgetter('option1name', 'option2name'))
            if purchased not in accs:
                accs.append(purchased)
            return
        
        else:
            return

    newImprint = copy(presentImprint)
    for (imp1, activity) in newImprint.items():
        # 남은것 중에 각인 하나를 랜덤으로 고른다.
        if int(activity) < 15:
            newImprint[imp1] = newImprint[imp1] + 3
            for (imp2, activity2) in newImprint.items():
                if imp1 != imp2 and activity2 < 15:
                    # 남은것중 각인 하나를 랜덤으로 고른다. 2
                    for i in range(3, 6):
                        # B&B, 앞으로 무슨 조합을 써도 답이안나오면 패스
                        if 40 - step * 8 > 3 + i + (5 - (step + 1)) * 8:
                            continue

                        newImprint[imp2] = newImprint[imp2] + i

                        new_purchased = copy(purchased)

                        acc = {
                            'option1name': imp1,
                            'option1count': 3,
                            'option2name': imp2,
                            'option2count': i
                        }

                        new_purchased.append(acc)
                        
                        ImprintCombination(step + 1, newImprint, new_purchased)
                        

                        newImprint[imp2] = newImprint[imp2] - i
            newImprint[imp1] = newImprint[imp1] - 3

def main():
    purchased = []
    presentImprint = {}

    presentImprint["잔재된기운"] = 12
    presentImprint["저주받은인형"] = 9
    presentImprint["기습의대가"] = 7
    presentImprint["슈퍼차지"] = 7
    presentImprint["원한"] = 0

    ImprintCombination(0, presentImprint, purchased)

    print(len(accs))
    for i in accs:
        for j in i:
            k = j.values()
            for item in k:
                print(item, end=" ")
        print()

if __name__ == "__main__":
	main()