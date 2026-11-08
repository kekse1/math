<img src="without.svg" /><br>
<img src="https://kekse.biz/github.php?draw&override=github:math" />

# **Mathematical** extensions

## JavaScript
[**TODO**](./js/)

**No** dependencies.

<br>

## Bash Shell
[**TODO**](./sh/math.sh)

Dependencies: `awk` (default Linux tool) for calculations and comparisons.

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
I'm keeping the different extensions in separate files. The base file [`math.mjs`](./js/math.mjs) will do
all initialization stuff (including checks against multiple application). The [modules](./js/math/) keep
their own `.initialize()` function, which gave me some advantages. Also a better handling of the
[`default.mjs`](./js/default.mjs) with some basic configuration!

<br>

* [**`main.mjs`**](./js/math/main.mjs)
* [`default.mjs`](./js/math/default.mjs)

<br>

* [`clock.mjs`](./js/math/clock.mjs)
* [`code.mjs`](./js/math/code.mjs)
* [`date.mjs`](./js/math/date.mjs)
* [`func.mjs`](./js/math/func.mjs)
* [`global.mjs`](./js/math/global.mjs)
* [`helper.mjs`](./js/math/helper.mjs)
* [`radix.mjs`](./js/math/radix.mjs)
* [`random.mjs`](./js/math/random.mjs)
* [`size.mjs`](./js/math/size.mjs)
* [`time.mjs`](./js/math/time.mjs)
* [`timeout.mjs`](./js/math/timeout.mjs)

<br>

Most of these modules are still (pure) **TODO**.

See also the [**`test/`**](./test/)s.

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

