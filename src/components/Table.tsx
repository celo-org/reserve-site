let arrayHeader = ["Quarter/Period", "BTC Delta", "CELO Delta", "ETH Delta", "DAI Delta", "Dollar Value"]

export default function Table(){

    const renderBody = () =>{
        return (
            <tr>
                <td>henry</td>
                <td>lala</td>
                <td>chu chu</td>
                <td>chuchuchuchuc</td>
            </tr>
        )
    }


    return(
        <div>
            <table>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </div>
    )
}