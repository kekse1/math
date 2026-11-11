<img src="without.svg" /><br>
<img src="https://kekse.biz/github.php?draw&override=github:math" />

# **Mathematical** extensions

## JavaScript
[**TODO**](./src/js/)

**No** dependencies.

<br>

## Bash Shell
[**TODO**](./src/sh/)

Dependencies: `awk` (default Linux tool) for arithmetic calculations and comparisons.

<br><br><br>

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
I'm keeping the different extensions in separate files. The base file [`math.mjs`](./src/js/math.mjs) will do
all initialization stuff (including checks against multiple application). The [modules](./src/js/math/) keep
their own `.initialize()` function, which gave me some advantages. Also a better handling of the
[`DEFAULT.mjs`](./src/js/DEFAULT.mjs) with some basic configuration!

<br>

### [JavaScript](./src/js/)

* [**`main.mjs`**](./src/js/math/main.mjs)
* [`DEFAULT.mjs`](./src/js/math/DEFAULT.mjs)

* [`util.mjs`](./src/js/math/util.mjs)

<br>

* [`clock.mjs`](./src/js/math/clock.mjs)
* [`code.mjs`](./src/js/math/code.mjs)
* [`date.mjs`](./src/js/math/date.mjs)
* [`func.mjs`](./src/js/math/func.mjs)
* [`global.mjs`](./src/js/math/global.mjs)
* [`numeric.mjs`](./src/js/math/numeric.mjs)
* [`radix.mjs`](./src/js/math/radix.mjs)
* [`random.mjs`](./src/js/math/random.mjs)
* [`size.mjs`](./src/js/math/size.mjs)
* [`time.mjs`](./src/js/math/time.mjs)
* [`timeout.mjs`](./src/js/math/timeout.mjs)

<br>

### [`bash` Shell](./src/sh/)

* [**`math.sh`**](./src/sh/math.sh)

* [`util.sh`](./src/sh/math/util.sh)

<br>

* [**`main.sh`**](./src/sh/math/main.sh)
* [`radix.sh`](./src/sh/math/radix.sh)
* [`size.sh`](./src/sh/math/size.sh)
* [`time.sh`](./src/sh/math/time.sh)

<br>

Most of these modules are still (pure) **TODO**.

See also the [**`test/`** directory](./test/).

<br><br>

# Comments / Links
I just found [**mathjs.org**](https://mathjs.org/), which looks good.

But I don't want this one to be a replacement for that one.

I just made this out of necessity and fun, for my own codes
to be archived somewhere. And I though these functions could
be interesting for my own applications. So please don't expect
**that** much code in here. It's just something I usually use
for myself. ;-)

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

