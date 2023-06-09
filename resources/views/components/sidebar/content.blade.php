<x-perfect-scrollbar
    as="nav"
    aria-label="main"
    class="flex flex-col flex-1 gap-4 px-3"
>

    <x-sidebar.link
        title="Dashboard"
        href="{{ route('dashboard') }}"
        :isActive="request()->routeIs('dashboard')"
    >
        <x-slot name="icon">
            <x-icons.dashboard class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
        </x-slot>
    </x-sidebar.link>

    <x-sidebar.link
        title="Income"
        href="/income"
        :isActive="request()->routeIs('income*')"
    >
        <x-slot name="icon">
            <x-heroicon-o-document-text class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
        </x-slot>
    </x-sidebar.link>

    @can('admin')
    <x-sidebar.link
        title="Forecasting"
        href="{{ route('forecasting') }}"
        :isActive="request()->routeIs('forecasting')"
    >
        <x-slot name="icon">
            <x-heroicon-o-document-chart-bar class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
        </x-slot>
    </x-sidebar.link>

    <x-sidebar.link
        title="Users"
        href="/users"
        :isActive="request()->routeIs('users*')"
    >
        <x-slot name="icon">
            <x-heroicon-o-users class="flex-shrink-0 w-6 h-6" aria-hidden="true" />
        </x-slot>
    </x-sidebar.link>
    @endcan

</x-perfect-scrollbar>
