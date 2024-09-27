export default function Main(props) {
    const {data} = props
    return (
        <div className="image-container">
            <img className="background-image" src={data?.hdurl} alt={data?.title || 'background-image'} />
        </div>
    )
}