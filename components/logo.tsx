interface LogoParams{
    font? : string
    width? : string
}


export default function Logo({font="lg",width="6"}:LogoParams) {

  return (
    <p className={`ml-2 text-${font} text-blue-600 font-normal flex flex-center justify-center items-center`}> C<img src="/assets/images/desk.svg" className={`w-${width} ml-[2px]`} />ffice</p>
  )
}
