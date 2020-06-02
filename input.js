let $label = "Count";
let $count = 0;

function inc() {
  $count = 2;
}

// prettier-ignore
V: (
  <div>
    <button>
      {$label}: {$count}
    </button>
  </div>
)
