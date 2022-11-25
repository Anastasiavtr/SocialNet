
import s from './Users.module.css'

const Paginator = (props) => {
       
   let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
   let pages = []

   for (let i = 1; i <= pagesCount; i++) {
   if (pages.length < 5) {
   pages.push(i)
   }  
} 
    return <div className={s.paginationBlock}>
        {pages.map((page, i) => {
        return <span className={`${s.page} ${(props.currentPage === page) ? s.SelectedPage : ''}`}
        key={i} onClick={(e) => {props.onPageChanged(page)}}>{ page }</span>
        })}</div> 
}


export default Paginator