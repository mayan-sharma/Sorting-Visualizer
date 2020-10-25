const arrayContainer = document.getElementById("array");
const sortButton = document.getElementById("sort");
// const cancelButton = document.getElementById('cancel');
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
let algoType = "selection";

const bubbleSort = arr => {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

        swapList.push([j, j + 1]);
        arrayList.push(JSON.parse(JSON.stringify(arr)));
      }
    }
  }
}

const selectionSort = arr => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min_idx]) min_idx = j;
    }
    [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];

    swapList.push([i, min_idx]);
    arrayList.push(JSON.parse(JSON.stringify(arr)));
  }
}

const insertionSort = arr => {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let j = i - 1;
    const key = arr[i];
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j--];
      swapList.push([j + 1, j]);
      arrayList.push(JSON.parse(JSON.stringify(arr)));
    }
    arr[j + 1] = key;
  }
}

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

const sortDOM = (arrayStyle, algoType) => {
  arrayList = [];
  swapList = [];
  switch (algoType) {
    case "bubble":
      bubbleSort(array);
      break;
    case "selection":
      selectionSort(array);
      break;
    case "insertion":
      insertionSort(array);
      break;
    default:
      bubbleSort(array);
  }
  arrayList.forEach((arr, i) => {
    setTimeout(() => addArrayDOM(arr, swapList[i], arrayStyle), i * delay);
  })
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

sortButton.addEventListener('click', () => sortDOM(arrayStyle, algoType));

function init() {
  arrayContainer.innerHTML = "";
  setArray(len);
  displayArray(array, arrayStyle);
}

init();