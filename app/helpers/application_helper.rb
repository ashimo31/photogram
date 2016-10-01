module ApplicationHelper

  def profile_img(user)
    return image_tag(user.avatar, alt: user.name) if user.avatar?

    unless user.provider.blank?
      img_url = user.image_url
    else
      img_url = 'no_image.png'
    end
    image_tag(img_url, alt: user.name)
  end

  def alert_for(flash_type)
    {
      success: 'alert-success text-center',
      error: 'alert-danger text-center',
      alert: 'alert-warning text-center',
      notice: 'alert-info text-center'
    }[flash_type.to_sym] || flash_type.to_s
  end

  def form_image_select(post)
    return image_tag post.image.url(:medium),
                     id: 'image-preview',
                     class: 'img-responsive' if post.image.exists?
    image_tag 'placeholder.jpg', id: 'image-preview', class: 'img-responsive'
  end

  def profile_avatar_select(user)
    return image_tag user.avatar.url(:medium),
                     id: 'image-preview',
                     class: 'img-responsive img-circle profile-image' if user.avatar.exists?
    image_tag 'default-avatar.jpg', id: 'image-preview',
                                    class: 'img-responsive img-circle profile-image'
  end
end

  module ActionView
    module Helpers
      module FormHelper
        def error_messages!(object_name, options = {})
          resource = self.instance_variable_get("@#{object_name}")
          return '' if !resource || resource.errors.empty?

          messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join

          html = <<-HTML
            <div class="alert alert-danger">
              <ul>#{messages}</ul>
            </div>
          HTML

          html.html_safe
        end

        def error_css(object_name, method, options = {})
          resource = self.instance_variable_get("@#{object_name}")
          return '' if resource.errors.empty?

          resource.errors.include?(method) ? 'has-error' : ''
        end
      end

      class FormBuilder
        def error_messages!(options = {})
          @template.error_messages!(@object_name, options.merge(object: @object))
        end

        def error_css(method, options = {})
          @template.error_css(@object_name, method, options.merge(object: @object))
        end
      end
    end
  end
