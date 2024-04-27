class Request < ApplicationRecord
    mount_uploader :photo, AvatarUploader
    belongs_to :executor, class_name: 'User', optional: true
    has_and_belongs_to_many :tags
    belongs_to :user

    def has_executor? 
        self.executor.present?
    end
end
