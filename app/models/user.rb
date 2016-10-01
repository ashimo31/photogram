class User < ActiveRecord::Base

# mount_uploader :avatar, AvatarUploader

  acts_as_voter
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :user_name, presence: true, length: { minimum: 4, maximum: 12 }

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  #      :authentication_keys => [:username]

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :notifications, dependent: :destroy

  has_attached_file :avatar, styles: { medium: '152x152#' }
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/


  #usernameを必須・一意とする
  validates_uniqueness_of :username
  validates_presence_of :username


  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
  user = User.where(provider: auth.provider, uid: auth.uid).first

    unless user
      user = User.new(
          name:     auth.extra.raw_info.name,
          provider: auth.provider,
          uid:      auth.uid,
          email:    auth.info.email ||= "#{auth.uid}-#{auth.provider}@example.com",
          image_url:   auth.info.image,
          password: Devise.friendly_token[0, 20]
      )
      user.skip_confirmation!
      user.save(validate: false)
    end
    user
  end

  def self.find_for_twitter_oauth(auth, signed_in_resource = nil)
     user = User.where(provider: auth.provider, uid: auth.uid).first

     unless user
       user = User.new(
           name:     auth.info.nickname,
           image_url: auth.info.image,
           provider: auth.provider,
           uid:      auth.uid,
           email:    auth.info.email ||= "#{auth.uid}-#{auth.provider}@example.com",
           password: Devise.friendly_token[0, 20],
       )
       user.skip_confirmation!
       user.save
     end
     user
   end

  def self.create_unique_string
   SecureRandom.uuid
  end

  def update_with_password(params, *options)
   if provider.blank?
     super
   else
     params.delete :current_password
     update_without_password(params, *options)
   end
  end

    #登録時にemailを不要とする
    def email_required?
      false
    end

    def email_changed?
      false
    end

    def self.find_first_by_auth_conditions(warden_conditions)
      conditions = warden_conditions.dup
      if login = conditions.delete(:login)
        #認証の条件式を変更する
        where(conditions).where(["username = :value", { :value => username }]).first
      else
        where(conditions).first
      end
    end
  #mount_uploader :avatar, AvatarUploader
end
