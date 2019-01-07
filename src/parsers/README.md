# Parser Nodes

Each Parser Node contains logic for ensuring grammar expectations for a particular Yorlang construct are met.

Available Parser Nodes are:

## - [Keyword Node Fun](./keywordnodes/kwnodefun.js)

Here's an example of the grammar for `fun`:

```txt
fun<whitespace>(<jeki-expression>;<expression>;<jeki-expression>) {
    <body>
}
```

## - [Keyword Node Gbewole](./keywordnodes/kwnodegbewole.js)

Here's an example of the grammar for `gbewole`:

```txt
gbewole<whitespace><string-expression>;
```

## - [Keyword Node Ise](./keywordnodes/kwnodeise.js)

Here's an example of the grammar for `ise`:

```txt
ise<whitespace><identifier>(<identifier>+) {
    <body>
}
```

## - [Keyword Node Jeki](./keywordnodes/kwnodejeki.js)

Here's an example of the grammar for `jeki`:

```txt
jeki<whitespace><identifier>=<whitespace><expression>;
```

## - [Keyword Node Kuro](./keywordnodes/kwnodekuro.js)

Here's an example of the grammar for `kuro`:

```txt
kuro;
```

## - [Keyword Node Nigbati](./keywordnodes/kwnodenigbati.js)

Here's an example of the grammar for `nigbati`:

```txt
nigbati<whitespace>(<expression>) {
    <body>
}
```

## - [Keyword Node Pada](./keywordnodes/kwnodepada.js)

Here's an example of the grammar for `pada`:

```txt
pada<whitespace><expression>;
```

## - [Keyword Node Se](./keywordnodes/kwnodese.js)

Here's an example of the grammar for `se` and `tabi`:

```txt
se<whitespace>(<expression>)<whitespace>{
    <body>
}
tabi<whitespace>se(<expression>)<whitespace>{
    <body>
}
tabi<whitespace>{
    <body>
}
```

## - [Keyword Node Sope](./keywordnodes/kwnodesope.js)

Here's an example of the grammar for `sope`:

```txt
sope<whitespace><expression>;
```

## - [Keyword Node Woke](./keywordnodes/kwnodewoke.js)

Here's an example of the grammar for `woke`:

```txt
woke<whitespace>`<identifier,?>+`;
```

## - [Keyword Node Yi](./keywordnodes/kwnodeyi.js)

Here's an example of the grammar for `yi`, `iru` and `padasi`:

```txt
yi<whitespace>(<identifier>)<whitespace>{
  iru<whitespace><expression>:
    <body>
  padasi:
    <body>
}
```

## - [Node Literal Array](./nodeLiterals/arraynl.js)

## - [Node Literal Bracket Expression](./nodeLiterals/bracketexpressionnl.js)

## - [Node Literal Call Ise](./nodeLiterals/callIseNl.js)

## - [Node Literal Keyword](./nodeLiterals/keywordnl.js)

## - [Node Literal Leaf](./nodeLiterals/leafnl.js)

## - [Node Literal Negate Expression](./nodeLiterals/negateexpressionnl.js)

## - [Node Literal Not Operator](./nodeLiterals/notoperatornl.js)

## - [Node Literal Variable](./nodeLiterals/variablenl.js)

