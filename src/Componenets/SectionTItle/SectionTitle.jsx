const SectionTitle = ({heading, subHeading}) =>{
    return(
        <div className="grid place-items-center">
            <i className='text-[#597445] text-center mb-3'>{subHeading}</i>
            <div className='w-[50%] md:w-[30%] h-1 bg-base-300 flex justify-center'></div>
            <h2 className='text-center text-4xl md:text-6xl lg:text-6xl text-[#597445] font-bold heading-font mb-3 mt-3'>{heading}</h2>
            <div className='mb-10 w-[50%] md:w-[30%] h-1 bg-base-300 flex justify-center'></div>
        </div>
    )
}
export default SectionTitle;