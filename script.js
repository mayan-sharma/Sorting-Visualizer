import { bubbleSort, selectionSort, insertionSort } from './utils/algorithms.js';

// DOM
const arrayContainer = document.getElementById("array");
const sortButton = document.getElementById("sort");
const resetButton = document.getElementById('reset');
const algoTypeInput = document.getElementById('algoType');
const arrayStyleInput = document.getElementById("arrayStyle");
const lengthSlider = document.getElementById("lengthSlider");
const delaySlider = document.getElementById("delaySlider");

let array = [];
let arrayList = [];
let swapList = [];
let len = 20;
let delay = 100;
let arrayStyle = "bars";
let algoType = "bubble";
// let isSorting = false;

const setArray = (len) => {
  array = [];
  for (let i = 0; i < len; i++) {
    array[i] = Math.floor(Math.random() * 100);
  }
}

const addBlocks = (arr, swapPair) => {
  arr.forEach((el, i) => {
    const element = document.createElement('div');
    element.classList.add('array__element');
    if (i == swapPair[0] || i == swapPair[1]) element.classList.add('red');
    element.innerHTML = el;
    arrayContainer.appendChild(element);
  })
}

const addBars = (arr, swapPair) => {
  arr.forEach((el, i) => {
    const color = (i == swapPair[0] || i == swapPair[1]) ? 'red' : 'black';
    const element = document.createElement('div');
    element.classList.add('array__bar');
    element.style.height = `${el}px`;
    element.style.backgroundColor = color;
    arrayContainer.appendChild(element);
  });
}

const addArrayDOM = (arr, swapPair, arrayStyle) => {
  arrayContainer.innerHTML = "";
  arrayStyle == "bars" ? addBars(arr, swapPair) : addBlocks(arr, swapPair);
}

const sortDOM = async (arrayStyle, algoType) => {
  arrayList = [];
  swapList = [];
  switch (algoType) {
    case "bubble":
      bubbleSort(array, arrayList, swapList);
      break;
    case "selection":
      selectionSort(array, arrayList, swapList);
      break;
    case "insertion":
      insertionSort(array, arrayList, swapList);
      break;
    case "merge":
      mergeSort(array, 0, array.length - 1);
      break;
    default:
      bubbleSort(array);
  }
  arrayList.forEach((arr, i) => {
    setTimeout(() => addArrayDOM(arr, swapList[i], arrayStyle), i * delay);
  });
}

const displayArray = (array, arrayStyle) => {
  arrayContainer.innerHTML = "";
  arrayStyle == "bars" ? addBars(array, [-1, -1]) : addBlocks(array, [-1, -1]);
}

algoTypeInput.addEventListener('change', (e) => {
  algoType = e.target.value;
})

arrayStyleInput.addEventListener('change', (e) => {
  arrayStyle = e.target.value;
  displayArray(array, arrayStyle);
});

lengthSlider.addEventListener("change", (e) => {
  len = e.target.value;
  init();
})

delaySlider.addEventListener("change", e => {
  delay = e.target.value;
  init();
})

sortButton.addEventListener('click', () => {
  sortButton.disabled = true;
  resetButton.disabled = true;
  sortDOM(arrayStyle, algoType);
  setTimeout(() => {
    sortButton.disabled = false;
    resetButton.disabled = false;
  }, arrayList.length * delay);
});

resetButton.addEventListener('click', () => {
  init();
});

function init() {
  arrayContainer.innerHTML = "";
  setArray(len);
  displayArray(array, arrayStyle);
}

init();