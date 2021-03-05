import { css } from '@emotion/core'
export default function Table(){
    
    
    
    const renderBody = () =>{
        return (
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        )
    }
    
    let arrayHeader = ["Quarter/Period", "BTC Delta", "CELO Delta", "ETH Delta", "DAI Delta", "Dollar Value"]
    
    return(
        <div>
            <table>
                <thead css={headerDiv}>
                    {arrayHeader.map((key, index) =>{
            return (
                    <th key={index}>{key.toUpperCase()}</th>
            )
        })}
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </div>
    )
    }

    const headerDiv = css({
        backgroundColor: '#D5EBF5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        padding: 5
    })