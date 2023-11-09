import { render } from "@testing-library/react";
import React from "react";
import SynonymList from "./SynonymList";

it('renders correctly', () => {
    const tree = render(
        <SynonymList
            originalWord={'word'}
            synonyms={[ 'one', 'two', 'three' ]}
            deleteHandler={(() => { return Promise.resolve() })}
        />)

    expect(tree).toMatchSnapshot()
})
