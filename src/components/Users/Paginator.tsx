import s from './Users.module.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page:number) => void
}

const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
       
   let pagesCount = Math.ceil(totalUsersCount / pageSize)
   let pages: Array<number> = []

   for (let i = 1; i <= pagesCount; i++) {
   if (pages.length < 5) {
   pages.push(i)
   }  
} 
    return <div className={s.paginationBlock}>
        {pages.map((page, i) => {
        return <span className={`${s.page} ${(currentPage === page) ? s.SelectedPage : ''}`}
        key={i} onClick={(e) => {onPageChanged(page)}}>{ page }</span>
        })}</div> 
}


export default Paginator