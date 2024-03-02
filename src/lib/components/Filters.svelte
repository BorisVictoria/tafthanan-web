
<!-- This component is a radio input that should allow the user to select whether they want the posts to be sorted by top, new, default-->
<!-- Should also contain a hamburger on mobile view to show settings/left div-->
<!-- Formula for default: (number of votes) / (how long ago it was posted) proposal lang-->

<script></script>

<article class="full-width filter">
    <form name="filter" class="filter">
        
        <strong>Sort by:</strong>

        <input type="radio" id="default" name="filter-by" value="default" checked>
        <div class="action-button pointer">
        <label for="default"><strong>Default</strong></label> 
        </div>

        <input type="radio" id="top" name="filter-by" value="top">
        <div class="action-button pointer">
        <label for="top"><strong>Top<strong></label>
        </div>

        <input type="radio" id="new" name="filter-by" value="new">
        <div class="action-button pointer">
        <label for="new"><strong>New</strong></label>
        </div>

    </form>
</article>

<style>
    .filter{
        gap : calc(var(--fs-m) * 0.75);
        flex-direction: row;
        display: flex;
    }

    label, input, strong{
        background-color: inherit;
        cursor: inherit;
    }

    .filter .action-button{
        height: auto;
        width: auto;
        overflow: hidden;
    }

    .filter input{
        display: none;
    }

    .action-button label{
        margin: 0 calc(var(--fs-m) * -1);
        padding: 0 calc(var(--fs-m));
    }

    .filter input:checked + .action-button{
        background-color: var(--accent-color); /* Change background color when checked */
        color: var(--background-color); /* Change text color when checked */
    }

</style>