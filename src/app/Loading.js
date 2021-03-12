import {Loader} from "semantic-ui-react";

export default function Loading({what}) {
    return (
        <Loader active content={`Loading ${what}...`}/>
    );
}