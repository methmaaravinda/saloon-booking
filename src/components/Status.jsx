//here we are going to implement the status component

const Status = ({ status }) => {
  if (status === 'open') {
    return <h1 className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-lg">open</h1>
  } else if (status === 'closed') {
    return <h1 className="bg-red-500 text-black text-xs font-bold px-2 py-1 rounded-lg">closed</h1>
  } else {
    return <h1 className="bg-gray-500 text-black text-xs font-bold px-2 py-1 rounded-lg">unknown</h1>
  }
}

export default Status