module ApplicationHelper

  def rails_to_bootstrap_flash(flash_type)
    if flash_type == "alert"
      "danger"
    elsif flash_type == "notice"
      "success"
    else
      flash_type
    end
  end

end
