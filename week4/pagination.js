<<<<<<< HEAD
export default {
  props: ['pages'],  //分頁資訊傳入 
  // :class="{ disabled: !pages.has_pre }" 意思是沒有前一頁會加上 disabled
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: !pages.has_pre }"> 
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" 
    :class="{ active: page === pages.current_page }"
    v-for="page in pages.total_pages" :key="page + 'page'">
    <a class="page-link" href="#"
    @prevent.click="$emit('get-product', page)">{{ page }}</a>
    </li>
    <li class="page-item" :class="{ disabled: !pages.has_next }">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`
}

=======
export default {
  props: ['pages'],  //分頁資訊傳入 
  // :class="{ disabled: !pages.has_pre }" 意思是沒有前一頁會加上 disabled
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: !pages.has_pre }"> 
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" 
    :class="{ active: page === pages.current_page }"
    v-for="page in pages.total_pages" :key="page + 'page'">
    <a class="page-link" href="#"
    @prevent.click="$emit('get-product', page)">{{ page }}</a>
    </li>
    <li class="page-item" :class="{ disabled: !pages.has_next }">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`
}

>>>>>>> dc3f841d47dca0871a2e1dbe8f9b81d32476a0bf
