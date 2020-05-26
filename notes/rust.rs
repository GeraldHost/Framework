fn start() {
    let state = State::new(0);

    let n0 = node("div");
    let n1 = node("button");
    
    append(n1, n0);
    
    let t0 = text("Count: ");
    append(t1, n1);

    let t1 = text(state.value());
    append(t0, n1);

    render(n0);
}
