## How to reproduce bug

1. `npm i`
1. `npm run storybook`
1. Navigate to the **Anchor → Anchor Transform** story
1. Open the **Devtool** and inspect console output

## Bug

`createEffect` seems to execute after the ref are resolved, but before they actually are inserted into the DOM.

If we delay the `console.log` call inside the `createEffect` with a `setTimeout(() => console.log(...), 0)`, the nodes are in the DOM.