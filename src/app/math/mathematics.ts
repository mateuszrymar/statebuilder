export class Mathematics {  
  series (startNumber: number, endNumber: number, count: number): number[] {
    let result = [];
    let step = (endNumber - startNumber) / (count - 1);
  
    for ( let i = 0; i < count; i++) {
      let y;
      y = startNumber + step * i;
      result.push(y); 
    }
    return result;
  }
}