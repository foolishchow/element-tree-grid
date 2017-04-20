# CSS Font Weight Names

A JSON Object of all CSS font weight names mapped to their numeric value.

## Usage

``` js
var fontweights = require('css-font-weight-names');

console.dir(fontweights);
```

yields

``` json
{
    "thin": 100,
    "extralight": 200,
    "ultralight": 200,
    "light": 300,
    "book": 400,
	...
}
```

This list is generated from the [Font Weight Numeric Values] section of the [W3C CSS Fonts Specification].

These values form an ordered sequence, where each number indicates a weight that is at least as dark as its predecessor. These roughly correspond to the commonly used weight names below:

- 100 - **Thin**
- 200 - **Extra Light**, **Ultra Light**
- 300 - **Light**
- 400 - **Normal**, **Book**, **Regular**
- 500 - **Medium**
- 600 - **Semi Bold**, **Demi Bold**
- 700 - **Bold**
- 800 - **Extra Bold**, **Ultra Bold**
- 900 - **Black**, **Heavy**

## Installation

```sh
npm install css-font-weight-names
```

---

These values are consistent with other frameworks, such as [.NET FontWeights], [JavaFX FontWeight], and [TypeKit Multiple Weights].

Two minor differences are that [.NET FontWeights] lists `extralight` as having a value of `100` instead of `200`, and that [TypeKit Multiple Weights] lists `heavy` as having a value of `800` instead of `900`.

[Font Weight Numeric Values]: http://www.w3.org/TR/css3-fonts/#font-weight-numeric-values
[.NET FontWeights]: https://msdn.microsoft.com/en-us/library/system.windows.fontweights(v=vs.110).aspx
[JavaFX FontWeight]: https://docs.oracle.com/javafx/2/api/javafx/scene/text/FontWeight.html
[TypeKit Multiple Weights]: http://help.typekit.com/customer/portal/articles/6855-using-multiple-weights-and-styles
[W3C CSS Fonts Specification]: http://www.w3.org/TR/css3-fonts/
