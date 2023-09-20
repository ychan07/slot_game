// script.js
const slots = ["🍒", "🍊", "🍇", "🍋", "🍉","🍓","🥝","🍏","🥑"];
const spinButton = document.getElementById("spinButton");
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const playerBalanceDisplay = document.getElementById("playerBalanceDisplay");
const betAmountInput = document.getElementById("betAmount");
const resultDisplay = document.getElementById("resultDisplay");
let spinning = false;
let playerBalance = 1000;

playerBalanceDisplay.innerText = `💰: $${playerBalance}`;

function spinSlot(slotElement) {
    return setInterval(() => {
        slotElement.innerText = getRandomSlot();
    }, 100);
}

function getRandomSlot() {
    const randomIndex = Math.floor(Math.random() * slots.length);
    return slots[randomIndex];
}

function spin() {
    if (spinning) return;

    if (!betAmountInput.value) {
        alert("베팅 금액을 입력하세요.");
        return;
    }

    const betAmount = parseInt(betAmountInput.value);
    if (betAmount <= 0 || betAmount > playerBalance) {
        alert("유효한 베팅 금액을 입력하세요.");
        return;
    }

    spinning = true;
    spinButton.disabled = true;

    const spinInterval1 = spinSlot(slot1);
    const spinInterval2 = spinSlot(slot2);
    const spinInterval3 = spinSlot(slot3);

    setTimeout(() => {
        clearInterval(spinInterval1);
    }, 2000);

    setTimeout(() => {
        clearInterval(spinInterval2);
    }, 3000);

    setTimeout(() => {
        clearInterval(spinInterval3);
        setTimeout(() => {
            checkResult(betAmount);
        }, 500);
    }, 4000);
    
}


function checkResult(betAmount) {
    const resultSlots = [slot1.innerText, slot2.innerText, slot3.innerText];

    if (resultSlots[0] === resultSlots[1] && resultSlots[1] === resultSlots[2]) {
        const winnings = betAmount * 10; // 세 개의 아이콘이 일치하면 10배의 보상
        playerBalance += winnings;
        alert(`축하합니다! 세 개의 아이콘이 일치했습니다! +$${winnings}`);
        
    } else if (resultSlots[0] === resultSlots[1] || resultSlots[1] === resultSlots[2] || resultSlots[0] === resultSlots[2]) {
        const winnings = betAmount * 2; // 두 개의 아이콘이 일치하면 2배의 보상
        playerBalance += winnings;
        alert(`두 개의 아이콘이 일치했습니다! +$${winnings}`);
        
    } else {
        playerBalance -= betAmount; // 일치하지 않으면 베팅 금액 차감
        alert("아쉽게도 일치하지 않았습니다.");
    }

    playerBalanceDisplay.innerText = `: 💰$${playerBalance}`;
    spinning = false;
    spinButton.disabled = false;
}

spinButton.addEventListener("click", spin);
