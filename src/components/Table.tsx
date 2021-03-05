
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
                <thead>
                    {arrayHeader.map((key, index) =>{
            return (
                <div>
                    <th key={index}>{key.toUpperCase()}</th>
                </div>
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