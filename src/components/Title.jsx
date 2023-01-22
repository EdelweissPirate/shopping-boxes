import { useEffect, useState } from "react"
import { generateUUID } from "three/src/math/MathUtils"

function Title() {
    const [textList, setTextList] = useState(null)

    useEffect(() => {initTextList()}, [])

    const _title = <h1>SUPER<span>AMAZING</span>MART</h1>

    const initTextList = () => {
        const array1 = new Array(4).fill(0).map(() => {
            return <li className="bolder" key={'mText0_' + generateUUID()}>{_title}</li>
        })

        const array2 = new Array(4).fill(0).map(() => {
            return <li className="bolder" key={'mText1_' + generateUUID()}>{_title}</li>
        })

        setTextList([array1, array2])
    }

    return (
        <div id="marquee" className='floatIn-down' >
            {textList ? 
            <>
                <ul className="anim-marquee">
                    {[...textList[0]]}
                </ul>

                <ul className="anim-marquee" aria-hidden="true">
                    {[...textList[1]]}
                </ul>
            </>
            :
            null}
        </div>
    )
}

export default Title