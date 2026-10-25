<img src="without.svg" /><br>
<img src="https://kekse.biz/github.php?draw&override=github:math" />

# **Mathematical** extensions (for JavaScript)
**TODO**!

<br><br>

> [!NOTE]
> When I talk about the '**radix**' — and I do it often, as I convert between number systems a lot — I mean
> the numerical base of the numbers/digits/symbols themselves, a kind of '**inner**' base (positional base or
> the alphabet size), or - geometrically speaking - the 'number **width**'.
> On the other hand, I define the word '**base**' more as an '**outer**' magnitude (overflow limit, or some
> modulo threshold) that describes the boundary of the 'number **height**' — for instance, 60 seconds
> or 1024 bytes. While this diverges from standard mathematical usage, it provides more expressiveness
> by assigning distinct roles to terms that are usually treated as synonyms.

<br><br>

## Modules
I'm keeping the different extensions in separate files. The base file [`math.mjs`](./src/math.mjs) will do
all initialization stuff (including checks against multiple application). The [modules](./src/math/) keep
their own `.initialize()` function, which gave me some advantages. Also a better handling of the
[`default.mjs`](./src/default.mjs) with some basic configuration!

<br>

* [**`main.mjs`**](./src/math/main.mjs)
* [`default.mjs`](./src/math/default.mjs)

<br>

* [`clock.mjs`](./src/math/clock.mjs)
* [`code.mjs`](./src/math/code.mjs)
* [`date.mjs`](./src/math/date.mjs)
* [`func.mjs`](./src/math/func.mjs)
* [`global.mjs`](./src/math/global.mjs)
* [`helper.mjs`](./src/math/helper.mjs)
* [`radix.mjs`](./src/math/radix.mjs)
* [`random.mjs`](./src/math/random.mjs)
* [`size.mjs`](./src/math/size.mjs)
* [`time.mjs`](./src/math/time.mjs)
* [`timeout.mjs`](./src/math/timeout.mjs)

Most of these modules are still (pure) **TODO**.

<br>

See also the [**`test/`**](./test/)s.

<br><br><br>

# Contact
<img src="https://kekse.biz/github.php?override=github:math&draw&text=math@kekse.biz&angle=6&size=38pt&fg=150,20,90&font=OpenSans&ro&readonly&h=64&v=16" />

<br>

# Copyright and License
The Copyright is [(c) Sebastian Kucharczyk](COPYRIGHT.txt),
and it's licensed under the [MIT](LICENSE.txt) (also known as 'X' or 'X11' license).

<a href="https://kekse.biz/">
<img src="favicon.png" alt="Favicon" />
</a>

