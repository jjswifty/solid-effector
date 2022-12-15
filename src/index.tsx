import { render } from 'solid-js/web';
import { Component } from 'solid-js';

const HelloWorld: Component = () => {
    console.log('Wow!');
    return <div>
        Hello world!</div>;
};

render(() => <HelloWorld />, document.getElementById('app') as HTMLElement);
