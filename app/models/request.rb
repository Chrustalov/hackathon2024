class Request < ApplicationRecord
    mount_uploader :photo, AvatarUploader

    has_and_belongs_to_many :tags
end
