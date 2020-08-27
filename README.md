# Calculator

Written by Caleb Caswell-Levy
Calebcaswelllevy@gmail.com
Aug 2020

---
## Introduction
 My motivation in completing this project was twofold. First, I wanted to get a better understanding of how to "wire up" javascript to an html/css user interface, in order to get some interactivity. Second, I wanted to understand how exactly keyboard inputs and mouse inputs are handled. A beneficial side effect is that I got a lot better at using CSS grid to place objects in specific places relative to each other and their parent node.

## Cool Features

 Here are some features of this calculator that make it especially cool:

- First, it can only handle 9 digits. And while that seems like a limitation at first, it's actually a really cool feature. There is no reason that it couldn't have handled numbers all the way up to the Javascript limit of 2^<sup>53</sup> (or even higher with creative use of bigInt). Having a limit on number of digits intentionally *models* a real calculator, which is limited by its LCD. To do this I needed to code in checks that ensure that the number of digits resulting from operations was less than the number of modeled LCD digits.

- It accepts both GUI button and keyboard input. Users can input info using any combination of clicking and typing, including numbers and relevant operators like `+`, `/`, `-` and `=`.

- It handles chained input. In other words, it can handle an arbitrary number of `digit operator digit operator` input sequences, and will wait to operate until `=` is pressed.

- It models a subdisplay that shows the preceding input chain. This lets users see what they have entered already. It was tricky to implement because it involved some CSS Grid tricks, and converting two arrays of numbers and operators into a correctly ordered string to display.
