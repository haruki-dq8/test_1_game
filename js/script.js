// プレイヤーステータス
const mainStatus = { // メインステータス
    maxHp: 480,
    maxMp: 250,
    attack: 120,
    defense: 30
}

const screenStatus = { // 表示するステータス
    hp: 480,
    mp: 250
}

// 敵ステータス
const enemies = [
    {
        image: 'https://github.com/haruki-dq8/test_1_game/blob/main/img/%E7%9B%97%E8%B3%8A%E3%83%95%E3%82%99%E3%83%AB%E3%83%BC.png',
        name: '盗賊',
        hp: 200,
        attack: 50,
        defense: 20
    },
    {
        image: 'https://github.com/haruki-dq8/test_1_game/blob/main/img/%E5%85%B5%E5%A3%AB%E3%83%95%E3%82%99%E3%83%AB%E3%83%BC.png',
        name: '兵士',
        hp: 300,
        attack: 90,
        defense: 30
    },
    {
        image: 'https://github.com/haruki-dq8/test_1_game/blob/main/img/%E3%82%BF%E3%82%99%E3%83%BC%E3%82%AF%E3%83%8A%E3%82%A4%E3%83%881.png',
        name: 'ダークナイト',
        hp: 100,
        attack: 90,
        defense: 220
    },
    {
        image: 'https://github.com/haruki-dq8/test_1_game/blob/main/img/%E3%83%A2%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%BC%E9%AD%94%E7%8E%8B.png',
        name: '魔王',
        hp: 1400,
        attack: 150,
        defense: 45
    }
];

// 敵のカウントと選択
let countEnemies = 0;
let count = 0;
// 敵　現在の敵を取得
let setEnemy = enemies[countEnemies];

// idの取得
const start = document.getElementById('start-command'); // スタートコマンドの取得
const fight = document.getElementById('fight-command'); // たたかう
const grades = document.getElementById('grades-command'); // せんせき
const explanation = document.getElementById('explanation-command'); // せつめい
const evade = document.getElementById('escape-command'); // にげる

const battleCommand = document.getElementById('battle-command'); // バトルコマンド
const incantation = document.getElementById('incantation'); // じゅもんコマンド
const skill = document.getElementById('skill'); // とくぎコマンド
const item = document.getElementById('item'); // アイテムコマンド
const commandA = document.getElementById('commandA'); // こうげき
const commandB = document.getElementById('commandB'); // じゅもん
const command1 = document.getElementById('command1'); // じゅもん1
const command2 = document.getElementById('command2'); // じゅもん2
const command4 = document.getElementById('command4'); // じゅもん4
const command5 = document.getElementById('command5'); // じゅもん5
const commandC = document.getElementById('commandC'); // ぼうぎょ
const commandD = document.getElementById('commandD'); // とくぎ
const commandS1 = document.getElementById('commandS1'); // とくぎ1
const commandS2 = document.getElementById('commandS2'); // とくぎ2
const commandS4 = document.getElementById('commandS4'); // とくぎ4
const commandS5 = document.getElementById('commandS5'); // とくぎ5
const commandE = document.getElementById('commandE'); // どうぐ
const commandI1 = document.getElementById('commandI1'); // アイテム1

const battle = document.getElementById('battle'); // バトル画面
const enemyImage = document.getElementById('enemy-img'); // 敵の画像
const enemyName = document.getElementById('enemy-name'); // 敵の名前

const warRecord = document.getElementById('war-record'); // 戦績(ログ)

// たたかう
fight.addEventListener('click', function () { // たたかうをクリック
    if (screenStatus.hp === 0) { // hpが0になったら
        const gameOver = document.getElementById('game-over').style.display = 'block'; // ゲームオーバーの表示
        const gameContainer = document.getElementById('game-container').style.display = 'none'; // ゲーム画面の非表示
        const reStart = document.getElementById('re-start').addEventListener('click', function () {
            location.reload();
        });
    } else { // hpが0以外なら
        start.style.display = 'none'; // スタートコマンドを消す
        battle.style.display = 'block'; // バトルの表示
        battleCommand.style.display = 'block'; // バトルコマンドの表示

        enemyBox.style.visibility = 'visible'; // 敵の名前の欄を表示
        enemyImage.style.display = 'block'; // 敵の画像を表示
        enemyName.style.display = 'block'; // 敵の名前を表示
        setEnemyScreen(); // 敵と敵の名前を表示する関数の呼び出し
    }
});

// せんせき
grades.addEventListener('click', function () { // たたかうをクリック
    start.style.display = 'none'; // スタートコマンドを消す
    warRecord.style.display = 'block'; // 戦績ログの表示
    const enemyCount = document.getElementById('enemy-count').textContent = `倒した敵の数 : ${count}`; // 倒した敵のカウントの表示

    document.getElementById('return-record').addEventListener('click', function () { // もどる
        start.style.display = 'block'; // スタートコマンドの表示
        warRecord.style.display = 'none'; // 戦績ログの非表示
    });
});

// せつめい
explanation.addEventListener('click', function () { // たたかうをクリック
    start.style.display = 'none'; // スタートコマンドを消す
    document.getElementById('explanation').style.display = 'block'; // せつめいの表示

    document.getElementById('return-explanation').addEventListener('click', function (){ // もどる
        start.style.display = 'block'; // スタートコマンドの表示
        document.getElementById('explanation').style.display = 'none'; // せつめいの非表示
    });
});

// たたかうコマンド
// こうげき
commandA.addEventListener('click', function () { // こうげきをクリック
    let attackDamage = mainStatus.attack - setEnemy.defense // 攻撃-防御(敵)
    let randomScore = Math.floor(Math.random() * 13) - 6; // 攻撃のブレを6
    let fainalDamage = attackDamage + randomScore; // ダメージ
    if (fainalDamage < 0) { // ファイナルダメージが-にならないように
        fainalDamage = 0;
    }
    setEnemy.hp = setEnemy.hp - fainalDamage // ダメージ後のhp
    damageNotation.textContent = fainalDamage; // ダメージの表示
    screenTime(); // 0.4秒後に削除

    battleCommand.style.display = 'none'; // バトルコマンドの削除
    branch(); // 敵の行動
});

// じゅもん
commandB.addEventListener('click', function () { // じゅもんをクリック
    incantation.style.display = 'block'; // じゅもんコマンドの表示
    battleCommand.style.display = 'none'; // バトルコマンドの削除
    returnId() // もどる

    command1.textContent = 'リジェラ'; // 回復呪文
    const cost1 = 25; // じゅもん15のコスト
    hoverText(command1, `消費MP : ${cost1}`); // ホバー時の表示

    command1.addEventListener('click', function () { // リジェラをクリック
        if (screenStatus.mp >= cost1) { // mpがコストより多かったら
            const recovery = 150; // 回復力
            let randomScore = Math.floor(Math.random() * 7) - 3; // 攻撃のブレを3
            const fainalRecovery = recovery + randomScore; // 最終回復力
            screenStatus.hp = Math.min(screenStatus.hp + fainalRecovery, mainStatus.maxHp); // 最大mpを超えないよう回復
            hpScreen.textContent = `HP : ${screenStatus.hp}`; // hp画面の表示

            screenMp(cost1); // コストのマイナス
            command1.removeEventListener('click', arguments.callee); // コストのリセット

            incantation.style.display = 'none'; // バトルコマンドの削除
            branch(); // 敵の行動
        }
    });

    command2.textContent = 'セラム'; // ブレのないダメージ
    const cost2 = 16;
    hoverText(command2, `消費MP : ${cost2}`);

    command2.addEventListener('click', function () {
        if (screenStatus.mp >= cost2) {
            const magnification = 1.2; // 1.2倍
            let attackDamage = mainStatus.attack - setEnemy.defense // 攻撃-防御(敵)
            let fainalDamage = Math.floor(attackDamage * magnification); // 最終ダメージ
            if (fainalDamage < 0) { // ファイナルダメージが-にならないように
                fainalDamage = 0;
            }
            damageNotation.textContent = fainalDamage; // ダメージの表示
            setEnemy.hp = setEnemy.hp - fainalDamage // ダメージ後のhp
            screenTime(); // 0.4秒後に削除

            screenMp(cost2); // コストのマイナス
            command2.removeEventListener('click', arguments.callee); // コストのリセット

            incantation.style.display = 'none'; // バトルコマンドの削除
            branch(); // 敵の行動
        }
    });

    command4.textContent = 'ブースト'; // 攻撃力を上げる
    const cost4 = 100; // コスト100
    hoverText(command4, `消費MP : ${cost4}`);

    command4.addEventListener('click', function () { // ブーストをクリック
        if (screenStatus.mp >= cost4) { // mpがコストより多かったら
            const statusUp = 1.3; // 1.3倍
            mainStatus.attack = Math.floor(mainStatus.attack * statusUp); // 攻撃力を1.4倍し、切り捨て

            screenMp(cost4); // コストのマイナス
            command4.removeEventListener('click', arguments.callee); // コストのリセット

            incantation.style.display = 'none'; // バトルコマンドの削除
            branch(); // 敵の行動
        }
    });

    command5.textContent = 'シェル'; // 防御力を上げる
    const cost5 = 55; // コスト75
    hoverText(command5, `消費MP : ${cost5}`);

    command5.addEventListener('click', function () { // シェルをクリック
        if (screenStatus.mp >= cost5) {
            const statusUp = 1.3; // 1.1倍
            mainStatus.defense = Math.floor(mainStatus.defense * statusUp); // 防御力を1.1倍し、切り捨て

            screenMp(cost5); // コストのマイナス
            command5.removeEventListener('click', arguments.callee); // コストのリセット

            incantation.style.display = 'none'; // バトルコマンドの削除
            branch(); // 敵の行動
        }
    });
});

// ぼうぎょ
commandC.addEventListener('click', function () { // ぼうぎょをクリック
    const statusUp = 40; // 防御力40up
    mainStatus.defense = mainStatus.defense + statusUp; // 防御力up
    setTimeout(function () { // 2秒後
        mainStatus.defense = mainStatus.defense - statusUp; // 元に戻す
    }, 2000);

    battleCommand.style.display = 'none'; // バトルコマンドの削除
    branch(); // 敵の行動
});

// とくぎ
commandD.addEventListener('click', function () { // とくぎをクリック
    skill.style.display = 'block'; // とくぎコマンドの表示
    battleCommand.style.display = 'none'; // バトルコマンドの削除
    returnId() // もどる

    commandS1.textContent = '乱打武斬'; // 攻撃ダメージがランダム
    cost1 = 48; // コスト48
    hoverText(commandS1, `消費MP : ${cost1}`);

    if (screenStatus.mp >= cost1) {
        commandS1.addEventListener('click', function () { // 乱打武斬をクリック
            let fainalDamage = Math.floor(Math.random() * 201); // 0から200ダメージ
            setEnemy.hp = setEnemy.hp - fainalDamage // ダメージ後のhp
            damageNotation.textContent = fainalDamage; // ダメージの表示
            screenTime(); // 0.4秒後に削除

            screenMp(cost1); // コストのマイナス
            commandS1.removeEventListener('click', arguments.callee); // コストのリセット

            skill.style.display = 'none'; // とくぎコマンドの削除
            branch(); // 敵の行動
        });
    }

    commandS2.textContent = '一天強打'; // 大ダメージ
    cost2 = 84;
    hoverText(commandS2, `消費MP : ${cost2}`);

    if (screenStatus.mp >= cost2) {
        commandS2.addEventListener('click', function () { // 一天強打のクリック
            const magnification = 1.8; // 1.8倍
            let attackDamage = mainStatus.attack - setEnemy.defense // 攻撃-防御(敵)
            let randomScore = Math.floor(Math.random() * 13) - 6; // 攻撃のブレを6
            let fainalDamage = Math.floor(attackDamage * magnification + randomScore); // ダメージ
            if (fainalDamage < 0) { // ファイナルダメージが-にならないように
                fainalDamage = 0;
            }

            setEnemy.hp = setEnemy.hp - fainalDamage // ダメージ後のhp
            damageNotation.textContent = fainalDamage; // ダメージの表示
            screenTime(); // 0.4秒後に削除

            screenMp(cost2); // コストのマイナス
            commandS2.removeEventListener('click', arguments.callee); // コストのリセット

            skill.style.display = 'none'; // バトルコマンドの削除
            branch(); // 敵の行動
        });
    }

    commandS4.textContent = '身体強化'; // 全ステup
    cost4 = 26; // コスト26
    hoverText(commandS4, `消費MP : ${cost4}`);
    if (screenStatus.mp >= cost4) {
        commandS4.addEventListener('click', function () {
            const statusUp = 1.1; // 倍率
            mainStatus.attack = Math.floor(mainStatus.attack * statusUp); // 攻撃力を1.2倍し、切り捨て
            mainStatus.defense = Math.floor(mainStatus.defense * statusUp); // 防御力を1.2倍し、切り捨て

            screenMp(cost4); // コストのマイナス
            commandS4.removeEventListener('click', arguments.callee); // コストのリセット

            skill.style.display = 'none'; // バトルコマンドの削除
            branch(); // 敵の行動
        });
    }
});

// どうぐ
commandE.addEventListener('click', function () { // どうぐをクリック
    item.style.display = 'block'; // とくぎコマンドの表示
    battleCommand.style.display = 'none'; // バトルコマンドの削除
    returnId() // もどる



    commandI1.addEventListener('click', function () { // 全回復薬をクリック
        if (commandI1.textContent === '全回復薬') { // コマンドが全回復薬だったら
            commandI1.textContent = ''; // 全回復薬を消す
            const recovery = 480;  // 回復力
            screenStatus.hp = Math.min(screenStatus.hp + recovery, mainStatus.maxHp); // 最大mpを超えないよう回復
            hpScreen.textContent = `HP : ${screenStatus.hp}`; // hp画面の表示

            item.style.display = 'none'; // バトルコマンドの削除
            branch(); // 敵の行動
        }
    });
});

// 敵の攻撃or切り替え
function branch() {
    if (setEnemy.hp <= 0) { // 敵のhpが0以下なら
        enemyImage.style.display = 'none'; // 敵の画像を削除
        enemyName.textContent = `${setEnemy.name}をたおした`;
        setTimeout(function () { // 2秒
            nextEnemy(); // 次の敵に進む
            startCommand(); // スタート画面の表示
            enemyBox.style.visibility = 'hidden'; // 敵の名前欄を消去
            enemyName.style.display = 'none'; // 敵の名前を削除
        }, 1900);

    } else {
        setTimeout(function () { // 1秒後
            enemyActions(); // 敵の行動に進む
            setTimeout(function () {
                startCommand(); // スタート画面の表示
            }, 600); // 0.4秒後
        }, 1000);
    }
}

// 次の敵に切り替え
function nextEnemy() {
    countEnemies++; // 敵のカウントを進める
    count++; // カウントを数える
    if (countEnemies < enemies.length) { // もし敵が残っていれば
        setEnemy = enemies[countEnemies]; // 次の敵を表示
        setEnemyScreen(); // 次の敵の情報を表示
    } else {
        alert('クリアしました');
    }
}

// 敵の行動
function enemyActions() {
    if (setEnemy.name === '盗賊') { // 敵がゾーマだったら
        normalAttack(); // ノーマル攻撃
    }
    else if (setEnemy.name === '兵士') { // 敵がゾーマだったら
        normalAttack(); // ノーマル攻撃
    }
    else if (setEnemy.name === 'ダークナイト') { // 敵がゾーマだったら
        normalAttack(); // ノーマル攻撃
    }
    else if (setEnemy.name === '魔王') { // 敵がゾーマだったら
        normalAttack(); // ノーマル攻撃
    }
}

// 敵の行動パターン
function normalAttack() { // ノーマル攻撃
    let attackDamage = setEnemy.attack - mainStatus.defense; // 攻撃(敵)-防御
    let randomScore = Math.floor(Math.random() * 7) - 3; // 攻撃のブレを3
    let fainalDamage = Math.max(attackDamage + randomScore, 0); // 最低を0に
    damageNotation2.textContent = `-${fainalDamage}`; // ダメージの表示
    setTimeout(() => { // 0.4秒後にダメージ処理
        damageNotation2.textContent = '';
    }, 400);
    sway(); // 画面の揺れ

    screenHp(fainalDamage);
}

// スタートコマンドの表示
function startCommand() {
    start.style.display = 'block'; // スタートの表示
}

// コマンドのもどる
function returnId() {
    document.getElementById('command6').addEventListener('click', function () { // もどるのidを取得
        incantation.style.display = 'none'; // じゅもんコマンドの非表示
        battleCommand.style.display = 'block'; // バトルコマンドの表示
    });
    document.getElementById('commandS6').addEventListener('click', function () { // もどるのidを取得
        skill.style.display = 'none'; // じゅもんコマンドの非表示
        battleCommand.style.display = 'block'; // バトルコマンドの表示
    });

    document.getElementById('commandI6').addEventListener('click', function () { // もどるのidを取得
        item.style.display = 'none'; // じゅもんコマンドの非表示
        battleCommand.style.display = 'block'; // バトルコマンドの表示
    });
}

// ホバー時のテキストの表示
function hoverText(element, text) {
    element.addEventListener('mouseover', function () {
        consumption.textContent = text; // テキストを更新
    });

    element.addEventListener('mouseout', function () {
        consumption.textContent = ''; // 元の状態に戻す
    });
}

//表示画面
//id取得
const hpScreen = document.getElementById('hp-screen'); // hp画面
const mpScreen = document.getElementById('mp-screen'); // mp画面
const consumption = document.getElementById('consumption-mp'); // 消費mp
const enemyBox = document.getElementById('enemy-box'); // 敵の名前を囲う枠
const damageNotation = document.getElementById('damage-notation') // 敵へのダメージ表記
const damageNotation2 = document.getElementById('damage-notation2') // 敵のダメージ

// 画面のhpの表示
function screenHp(damage) {
    screenStatus.hp -= damage; // プレイヤーのhpを下げる
    if (screenStatus.hp < 0) screenStatus.hp = 0; // hpが0以下にならないようにする
    hpScreen.textContent = `HP : ${screenStatus.hp}`; // hp画面の表示
}

// 画面のmpの表示
function screenMp(cost) {
    screenStatus.mp -= cost; // プレイヤーのmpを下げる
    if (screenStatus.mp < 0) screenStatus.mp = 0; // mpが0以下にならないようにする
    mpScreen.textContent = `MP : ${screenStatus.mp}`; // mp画面の表示
}

// ステータス画面の表示
hpScreen.textContent = `HP : ${screenStatus.hp}`; // hpの表示
mpScreen.textContent = ` MP : ${screenStatus.mp}`; // mpの表示

// 敵の表示
function setEnemyScreen() {
    enemyImage.src = setEnemy.image; // 画像を表示するコードを設定
    enemyName.textContent = setEnemy.name; // 名前を表示するコードの設定
}

// 表示したダメージの削除
function screenTime() {
    setTimeout(() => { // 0.4秒後
        damageNotation.textContent = '';
    }, 400)
}

// 画面を揺らす
function sway() {
    document.body.classList.add('shake'); // 画面を揺らす用のクラスを追加
    setTimeout(function () { // 0.4秒で止める
        document.body.classList.remove('shake');
    }, 400);
}