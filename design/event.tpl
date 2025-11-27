<script>
    function xxx(state) {
        $trigger('test', state.xxx)
    }

    export default  {
        defaultState: {
            xxx: 'test value'
        }
    }
</script>

<p data-testid="event-test" onClick={() => xxx(state)}></p>