<template>
    <div class="sidebar">
        <ul>
            <li>
                <NuxtLink to="/" class="button is-ghost" activeClass="active">
                    <span class="icon is-small">
                        <font-awesome :icon="['fas', 'house']" class="list-icon" /> 
                    </span>
                    <span>Home</span>
                </NuxtLink>
            </li>
            <li> 
                <NuxtLink to="/notifications" class="button is-ghost" activeClass="active">
                    <span class="icon is-small">
                        <font-awesome :icon="['fas', 'bell']" class="list-icon" />
                    </span>
                    <span>Notifications</span>
                </NuxtLink>
            </li>
            <li>
                <button class="button is-text">
                    <span class="icon is-small">
                        <font-awesome :icon="['fas', 'right-from-bracket']"  class="list-icon" />
                    </span>
                    <span>Logout</span>
                </button>
            </li>
        </ul>
        <hr />
        <h3 class="subtitle is-3">
            Sunset
        </h3>
        <p>
            An experimental Bluesky client, made by <a href="/@jsalvador.me">@jsalvador.me</a>.
        </p>
        <br/>
        <ul>
            <li>
                <a href="">GitHub</a> 
            </li>
        </ul>
    </div>
</template>

<style scoped>
.list-icon {
  margin-right: 1em;
}
.sidebar {
    position: fixed;
    top: 4.75rem;
}
</style>