export default function Slottime({slot,setslot}){
    return(
        <div className="slot-time">
            <label htmlFor="slot">Duration:</label>
            <select id="slot" value={slot} onChange={(e) => setslot(e.target.value)}>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
            </select>
        </div>
    )
}