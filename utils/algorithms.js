export const bubbleSort = (arr, arrayList, swapList) => {
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
  
export const selectionSort = (arr, arrayList, swapList) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            swapList.push([j, -1]);
            arrayList.push(JSON.parse(JSON.stringify(arr)));
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
        swapList.push([i, min_idx]);
        arrayList.push(JSON.parse(JSON.stringify(arr)));
    }
    
}
  
export const insertionSort = (arr, arrayList, swapList) => {
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

// export const mergeSort = (arr, arrayList, swapList) => {
    
//     const merge = () => {

//     }
    
//     const n = arr.length;

// }