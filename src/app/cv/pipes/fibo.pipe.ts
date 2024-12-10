import { Pipe, PipeTransform } from '@angular/core';

function fibo(n: number): number {
  // Your fibo logic here
  if (n < 2) return n;
  return fibo(n - 1) + fibo(n - 2);
}

@Pipe({ name: 'fiboPipe', pure: true , standalone: true, })
export class FiboPipe implements PipeTransform {
  transform(age: number): number {
    return fibo(age);
  }
}
