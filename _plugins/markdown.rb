module Jekyll
    class MarkdownBlock < Liquid::Block
      def initialize(tag_name, text, tokens)
        super
      end
      require "kramdown"
      def render(context)
        content = super
        "#{Kramdown::Document.new(content).to_html}"
      end
    end
  end
  Liquid::Template.register_tag('markdown', Jekyll::MarkdownBlock)

#   this function will force html tags to support Markdown, so out text is not inherit from normal htmls
#    and we can now use "rtl" tag