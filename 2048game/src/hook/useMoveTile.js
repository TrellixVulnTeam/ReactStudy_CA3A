import {useEffect} from "react/cjs/react.development";
import {addKeyObserver, removeKeyObserver} from "../util/keyboard";
import {makeTile, moveTile} from "../util/tile";

//add와 remove를 훅의 특성 및 직관적인 방식으로 코딩하기 위해 useEffect 안에는 add를 리턴문 안에는 remove를 사용
export default function useMoveTile({tileList, setTileList, setScore}) {
    function moveAndAdd({x, y}) {
        const newTileList = moveTile({tileList, x, y});
        const score = newTileList.reduce((acc, item) => (
            item.isMerged
                ? acc + item.value
                : acc
        ), 0,);
        setScore(v => v + score);
        const newTile = makeTile(newTileList);
        newTile.isNew = true;
        newTileList.push(newTile);
        setTileList(newTileList);
    }

    function moveUp() {
        moveAndAdd({x: 0, y: -1});
    }
    function moveDown() {
        moveAndAdd({x: 0, y: 1});
    }
    function moveLeft() {
        moveAndAdd({x: -1, y: 0});
    }
    function moveRight() {
        moveAndAdd({x: 1, y: 0});
    }
    useEffect(() => {
        addKeyObserver('up', moveUp);
        addKeyObserver('down', moveDown);
        addKeyObserver('left', moveLeft);
        addKeyObserver('right', moveRight);
        return() => {
            removeKeyObserver('up', moveUp);
            removeKeyObserver('down', moveDown);
            removeKeyObserver('left', moveLeft);
            removeKeyObserver('right', moveRight);
        };
    }, [tileList, setTileList, setScore]);
}