// Modern counter animation - handled by main JavaScript in index.ejs
// This file is kept for compatibility but functionality moved to main page

// Alternative jQuery implementation for backward compatibility
if (typeof $ !== 'undefined' && $.fn.counterUp) {
    $('.counter').each(function() {
        var $this = $(this);
        var target = $this.data('target') || $this.text();
        
        $this.prop('Counter', 0).animate({
            Counter: target
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $this.text(Math.ceil(now));
            }
        });
    });
}
