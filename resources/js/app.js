import './bootstrap'
import swal from 'sweetalert'
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import PerfectScrollbar from 'perfect-scrollbar'
import $ from 'jquery'
window.PerfectScrollbar = PerfectScrollbar

document.addEventListener('alpine:init', () => {
    Alpine.data('mainState', () => {
        let lastScrollTop = 0
        const init = function () {
            window.addEventListener('scroll', () => {
                let st =
                    window.pageYOffset || document.documentElement.scrollTop
                if (st > lastScrollTop) {
                    // downscroll
                    this.scrollingDown = true
                    this.scrollingUp = false
                } else {
                    // upscroll
                    this.scrollingDown = false
                    this.scrollingUp = true
                    if (st == 0) {
                        //  reset
                        this.scrollingDown = false
                        this.scrollingUp = false
                    }
                }
                lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
            })
        }

        const getTheme = () => {
            if (window.localStorage.getItem('dark')) {
                return JSON.parse(window.localStorage.getItem('dark'))
            }
            return (
                !!window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
            )
        }
        const setTheme = (value) => {
            window.localStorage.setItem('dark', value)
        }
        return {
            init,
            isDarkMode: getTheme(),
            toggleTheme() {
                this.isDarkMode = !this.isDarkMode
                setTheme(this.isDarkMode)
            },
            isSidebarOpen: window.innerWidth > 1024,
            isSidebarHovered: false,
            handleSidebarHover(value) {
                if (window.innerWidth < 1024) {
                    return
                }
                this.isSidebarHovered = value
            },
            handleWindowResize() {
                if (window.innerWidth <= 1024) {
                    this.isSidebarOpen = false
                } else {
                    this.isSidebarOpen = true
                }
            },
            scrollingDown: false,
            scrollingUp: false,
        }
    })
})

Alpine.plugin(collapse)

Alpine.start()

$('document').ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // $('.btndeleteincome').click(function (e) {
    //     e.preventDefault();
    //     const deleteid = $(this).val();
    //     console.log(deleteid)

    //     swal({
    //         title: "Apakah anda yakin?",
    //         text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     })
    //     .then((willDelete) => {
    //         if (willDelete) {

    //             const data = {
    //                 "_token": $('input[name=_token]').val(),
    //                 'id': deleteid,
    //             };
    //             $.ajax({
    //                 type: "DELETE",
    //                 url: 'income/' + deleteid,
    //                 data: data,
    //                 success: function (response) {
    //                     swal(response.status, {
    //                             icon: "success",
    //                         })
    //                         .then((result) => {
    //                             location.reload();
    //                         });
    //                 }
    //             });
    //         }
    //     });
    // })

    $('.btndeleteuser').click(function (e) {
        e.preventDefault();
        const deleteid = $(this).val();

        swal({
            title: "Apakah anda yakin?",
            text: "Setelah dihapus, Anda tidak dapat memulihkan Data ini lagi!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {

                const data = {
                    "_token": $('input[name=_token]').val(),
                    'id': deleteid,
                };
                $.ajax({
                    type: "DELETE",
                    url: 'users/' + deleteid,
                    data: data,
                    success: function (response) {
                        swal(response.status, {
                                icon: "success",
                            })
                            .then((result) => {
                                location.reload();
                            });
                    }
                });
            }
        });
    })
})